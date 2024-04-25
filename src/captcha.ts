import objects from '../models/objects.json';

import Render from './render';
import { randomBytes } from "crypto";
import { decrypt, encrypt } from "./cryptography";
import { rgbToMtlCoefficients, rSelect } from "./utils";
import { ObjectData, MtlCoefficients, Captcha } from "./interface";

// Temporaraly force every captcha to be a car
const selectedModel = 'car'

// Export the captcha class as a module
module.exports = class captcha implements Captcha {
    #_encryptionKeys: Buffer[];
    #_encryptionIvs: Buffer[];
    #_encryptionRotate: Date;

    constructor() {
        // Generate encryption random key and iv, this approach
        // generates a new key and iv for every instance of the class.

        this.#_encryptionKeys = [randomBytes(32)];
        this.#_encryptionIvs = [randomBytes(16)];
        this.#_encryptionRotate = new Date();
    }

    async generate() {

        // Rotate encryption keys every 5 minutes. The approach here is somewhat distinctive: 
        // to minimize memory usage, we refrain from storing every generated captcha in memory 
        // awaiting resolution. Instead, we maintain an array of 10 keys and 10 initialization 
        // vectors (IVs). Every 5 minutes, we discard the oldest key pair and introduce a new 
        // one. Subsequently, the encryption algorithm employs the latest key, while decryption 
        // attempts are made incrementally, starting from the newest key and moving backward 
        // through the sequence.

        if (((new Date().getTime() - this.#_encryptionRotate.getTime()) / 1000 / 60) > 5) {
            this.#_encryptionRotate = new Date();
            this.#_encryptionKeys.push(randomBytes(32))
            this.#_encryptionIvs.push(randomBytes(16))

            if (this.#_encryptionKeys.length > 10) {
                delete this.#_encryptionKeys[0]
                delete this.#_encryptionIvs[0]
            }
        }

        // Generate the indiviual images, each captcha uses 6 images so we 
        // generate 6 "options" each option has a model name, colour name,
        // direction description, base64 image, and a token.

        const history = [] as { model: string, colour: string, direction: string }[];

        const options = await Promise.all(Array.from({ length: 6 }, () => {
            return new Promise(async (res): Promise<any> => {
                let object = Object.assign({}, objects[selectedModel]) as ObjectData;

                // Select a random color then apply it to the model, some models have diffrent properties,
                // so colours must be defined in the models.json.

                let colour = rSelect(Object.values(object.colours));
                object.colour = rgbToMtlCoefficients(colour.r, colour.g, colour.b) as MtlCoefficients;

                // Make sure each image is unique, they can have the same colour and model,
                // and direction however a model with a colour and direction that has already
                // been used cannot be used again. for example if we have a blue car facing foward
                // we can have a red car facing foward but we cannot have a blue car facing foward again
                // that being said we can still have a blue car facing left, right, or back.


                let usedDirectionsSet = new Set();
                let availableDirections = [];

                for (let historyObject of history) {
                    if (historyObject.colour === colour.name) {
                        usedDirectionsSet.add(historyObject.direction);
                    }
                }

                for (let direction of Object.values(object.directions)) {
                    if (!usedDirectionsSet.has(direction.name)) {
                        availableDirections.push(direction);
                    }
                }

                if (availableDirections.length === 0) {
                    // We have run out of unique directions for this colour, so we need to
                    // select a new colour and reset the available directions.
                }

                // Select a random direction then find a random point in that direction,
                // some models have diffrent axis points so directions need to be defined
                // in the model.json

                const direction = rSelect(availableDirections);
                object.rotation = {
                    "y": Math.random() * (direction.max - direction.min) + direction.min,
                    "x": Math.random() * (object.rotation_range.x.max - object.rotation_range.x.min) + object.rotation_range.x.min
                }

                history.push({ model: object.name, colour: colour.name, direction: direction.name });
                //console.log(history, history.length)

                res({
                    model: object.name,
                    colour: colour.name,
                    direction: direction.name,
                    image: await Render(object),
                    token: randomBytes(12).toString('hex')
                })
            })
        })) as {
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
        const anwser = await encrypt(selected.token, this.#_encryptionKeys, this.#_encryptionIvs);

        if (!anwser) {
            throw new Error('Failed to encrypt answer');
        }

        return {
            "images": options.map((option) => {
                // Add the starting padding to the base64 so the frontend doesnt have to.
                return {
                    base64: 'data:image/png;base64,' + option.image.toString('base64').replace(/(\r\n|\n|\r)/gm, ""),
                    token: option.token
                }
            }),
            "anwser": {
                "model": selected.model,
                "colour": selected.colour,
                "direction": selected.direction,
                "token": anwser
            },
        };
    }

    async verify(token: string, anwserToken: string) {
        const decryptedToken = await decrypt(anwserToken, this.#_encryptionKeys, this.#_encryptionIvs);

        if (!decryptedToken) {
            throw new Error('Failed to decrypt token');
        }

        return token === decryptedToken;
    }
}