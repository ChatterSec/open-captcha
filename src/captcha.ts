import { randomBytes, createHash } from "crypto";
import objects from '../models/objects.json';
import { addAlpha, rgbToMtlCoefficients } from "./utils";
import { generateImage } from './filter';
import { ObjectData, MtlCoefficients } from "./interface";
import { render } from './render';
import sharp from 'sharp';
import { encrypt } from "./cryptography";

const selectedModel = 'car'
 
export default class captcha {
    #_encryptionKey: Buffer;
    #_encryptionIv: Buffer;

    constructor() {
        this.#_encryptionKey = randomBytes(32);
        this.#_encryptionIv = randomBytes(16);
    }

    async generate(): Promise<{model:string, colour:string, direction:string, images:{base64:String, hash:string}[], anwser:string}> {

        const options = []

        for (let i = 0; i < 6; i++) {
            const background = generateImage();
            const overlay = await addAlpha(generateImage(), 0.3);
            let object = Object.assign({}, objects[selectedModel]) as ObjectData;

            const colour = Object.values(object.colours)[Math.floor(Math.random() * Object.values(object.colours).length)];
            object.colour = rgbToMtlCoefficients(colour.r, colour.g, colour.b) as MtlCoefficients;

            const direction = Object.values(object.directions)[Math.floor(Math.random() * Object.values(object.directions).length)];
            object.rotation = {
                "y": Math.random() * (direction.max - direction.min) + direction.min,
                "x": Math.random() * (object.rotation_range.x.max - object.rotation_range.x.min) + object.rotation_range.x.min
            }

            const rendering = new Promise((resolve, reject) => {
                try {
                    render(object, (buffer: Buffer) => {
                        sharp(background)
                        .composite([
                            { input: buffer, blend: 'over' },
                            { input: overlay, blend: 'over'}
                        ])
                        .toBuffer()
                        .then((data) => {
                            resolve(data);
                        })
                        .catch((error) => {
                            reject(error);
                        
                        });
                    }) 
                } catch (error) {
                    reject(error);
                }
            }) as Promise<Buffer>;

            options.push({ 
                model: object.name,
                colour: colour.name,
                direction: direction.name,
                imageBuffer: await rendering,
                hash: createHash('sha256').update(JSON.stringify(object)).digest('hex')
            })
        }

        const selected = options[Math.floor(Math.random() * options.length)];

        return {
            "model": selected.model,
            "colour": selected.colour,
            "direction": selected.direction,
            "images": options.map((option) => {return {base64: option.imageBuffer.toString('base64'), hash: option.hash}}),
            "anwser": encrypt(selected.hash, this.#_encryptionKey, this.#_encryptionIv),
        };
    }

    validate(userAnswer: string, encryptedAnswer: string): boolean {

        return true;
    }
}