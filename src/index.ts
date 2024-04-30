import default_objects from '../models/objects.json';

import Render from './render';
import { randomBytes } from "crypto";
import { decrypt, encrypt } from "./cryptography";
import { rgbToMtlCoefficients, rSelect, objStats } from "./utils";
import { ObjectData, MtlCoefficients, Captcha } from "./interface";

// Export the captcha class as a module.

module.exports = class implements Captcha {
    #_keys: Buffer[];
    #_ivs: Buffer[];
    #_rotate: Date;
    #_objects: ObjectData[];

    constructor(objects: { [key: string]: ObjectData }) {
        // Generate encryption random key and iv, this approach
        // generates a new key and iv for every instance of the class.

        this.#_keys = [randomBytes(32)];
        this.#_ivs = [randomBytes(16)];
        this.#_rotate = new Date();

        // Merge the default objects with the objects passed to the constructor.

        this.#_objects = Object.values({
            ...default_objects,
            ...objects
        }) as ObjectData[];

        // Check if the models are valid and have the required files.

        const objectLength = this.#_objects.length;
        for (let i = 0; i < objectLength; i++) {
            const object = this.#_objects[i];

            objStats(`models${object.obj}`).then((stats) => {
                if (stats.verticesCount === 0 || stats.facesCount === 0) {
                    throw new Error(`Invalid object file: ${object.obj}`);
                }

                if (stats.verticesCount >= 10000 || stats.facesCount >= 10000) {
                    throw new Error(`Poly count too large: ${object.obj} (v: ${stats.verticesCount}, f: ${stats.facesCount}) [both must be below 10,000]`);
                }

                if (stats.verticesCount >= 2500 || stats.facesCount >= 2000) {
                    console.warn(`\x1b[33m[!]\x1b[0m High poly object: ${object.obj} (v: ${stats.verticesCount}, f: ${stats.facesCount})`);
                }
            }).catch((err) => {
                throw new Error(err);
            });
        }
    }

    async generate() {

        // Rotate encryption keys every 5 minutes. The approach here is somewhat distinctive: 
        // to minimize memory usage, we refrain from storing every generated captcha in memory 
        // awaiting resolution. Instead, we maintain an array of 10 keys and 10 initialization 
        // vectors (IVs). Every 5 minutes, we discard the oldest key pair and introduce a new 
        // one. Subsequently, the encryption algorithm employs the latest key, while decryption 
        // attempts are made incrementally, starting from the newest key and moving backward 
        // through the sequence.

        if (((new Date().getTime() - this.#_rotate.getTime()) / 1000 / 60) > 5) {
            this.#_rotate = new Date();
            this.#_keys.push(randomBytes(32))
            this.#_ivs.push(randomBytes(16))

            if (this.#_keys.length > 10) {
                delete this.#_keys[0]
                delete this.#_ivs[0]
            }
        }

        // Generate the indiviual images, each captcha uses 6 images so we 
        // generate 6 "options" each option has a model name, colour name,
        // direction description, base64 image, and a token.

        const history = [] as { model: string, colour: string, direction: string }[];

        const options = await Promise.all(Array.from({ length: 6 }, () => new Promise(async (res): Promise<any> => {
                let object = Object.assign({}, rSelect(this.#_objects)) as ObjectData; // Select a random model.

                // Select the least used colour for this model, this is to make sure that
                // each model doesnt use the same colour every time. This also fixes the 
                // issue where models with the same colour and direction are used multiple.

                const usedColours = history.map((h) => h.colour);
                const usedColoursMap: { [colour: string]: number } = {};

                const colourLength = object.colours.length;
                for (let i = 0; i < colourLength; i++) {
                    const c = object.colours[i];
                    usedColoursMap[c.name] = 0;
                }

                const usedColoursLength = usedColours.length;
                for (let i = 0; i < usedColoursLength; i++) {
                    const colour = usedColours[i];
                    if (usedColoursMap[colour] !== undefined) {
                        usedColoursMap[colour]++;
                    } else {
                        usedColoursMap[colour] = 1;
                    }
                }

                let colour = object.colours.filter((c) => c.name === Object.keys(usedColoursMap).reduce((a, b) => usedColoursMap[a] < usedColoursMap[b] ? a : b))[0];
                object.colour = rgbToMtlCoefficients(colour.r, colour.g, colour.b) as MtlCoefficients;

                // Make sure each image is unique, they can have the same model and direction
                // however a model with a colour and direction that has already been used cannot be
                // used again. for example if we have a blue car facing foward we can have a red car facing
                // foward but we cannot have a blue car facing foward again that being said we can
                // still have a blue car facing left, right, or back.

                let usedDirectionsSet = new Set();
                let availableDirections = [];

                const historyLength = history.length;
                for (let i = 0; i < historyLength; i++) {
                    const historyObject = history[i];
                    if (historyObject.colour === colour.name) {
                        usedDirectionsSet.add(historyObject.direction);
                    }
                }

                const directions = Object.values(object.directions);
                const directionsLength = directions.length;
                for (let i = 0; i < directionsLength; i++) {
                    const direction = directions[i];

                    if (!usedDirectionsSet.has(direction.name)) {
                        availableDirections.push(direction);
                    }
                }

                if (availableDirections.length === 0) {
                    // We have run out of unique directions for this colour.
                    new Error('No available directions for this colour');
                }

                // Select a random direction then find a random point in that direction,
                // some models have diffrent axis points so directions need to be defined
                // in the model.json

                const direction = rSelect(availableDirections);
                object.rotation = {
                    "y": Math.random() * (direction.max - direction.min) + direction.min,
                    "x": Math.random() * (object.rotation_range.x.max - object.rotation_range.x.min) + object.rotation_range.x.min
                }

                // Add the current model, colour, and direction to the history so we can
                // make sure we dont use the same model, colour, and direction again.

                history.push({ model: object.name, colour: colour.name, direction: direction.name });

                return res({
                    model: object.name,
                    colour: colour.name,
                    direction: direction.name,
                    image: await Render(object),
                    token: randomBytes(12).toString('hex')
                })
            })
        )) as {
            model: string,
            colour: string,
            direction: string,
            image: Buffer,
            token: string
        }[]

        // Randomly select an option and then encrypt the token, this encrypted token is also sent
        // the client they awy it works is the client selects an "option" then the frontend sends the
        // selected token and the encrypted anwser token (anwser) we then decrypt the anwser token
        // and compare it to theselected token and if its a match then the user is not a bot.

        const selected = rSelect(options);
        const anwser = await encrypt(selected.token, this.#_keys, this.#_ivs);

        if (!anwser) {
            throw new Error('Failed to encrypt answer');
        }

        // Parse the images object to a format that can be sent to the client.

        const images = options.map((option) => {
            return {
                base64: 'data:image/png;base64,' + option.image.toString('base64').replace(/(\r\n|\n|\r)/gm, ""), // Add the starting padding to the base64 so the frontend doesnt have to.
                token: option.token
            }
        })

        return {
            "images": images,
            "anwser": {
                "model": selected.model,
                "colour": selected.colour,
                "direction": selected.direction,
                "token": anwser
            },
        };
    }

    async verify(token: string, anwserToken: string) {
        const decryptedToken = await decrypt(anwserToken, this.#_keys, this.#_ivs);

        if (!decryptedToken) {
            throw new Error('Failed to decrypt token');
        }

        return token === decryptedToken;
    }
}