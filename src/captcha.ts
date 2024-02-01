import {randomBytes} from "crypto";
import objects from '../models/objects.json';
import { addAlpha, rgbToMtlCoefficients } from "./utils";
import { generateImage } from './filter';
import { ObjectData, MtlCoefficients } from "./interface";
import { render } from './render';
import sharp from 'sharp';

const selectedModel = 'car'
 
export default class captcha {
    #_encryptionKey: Buffer;
    #_encryptionIv: Buffer;

    constructor() {
        this.#_encryptionKey = randomBytes(32);
        this.#_encryptionIv = randomBytes(16);
    }

    async generate(): Promise<object> {

        const background = generateImage();
        const overlay = await addAlpha(generateImage(), 0.3);
        let object = Object.assign({}, objects[selectedModel]) as ObjectData;

        const colour = Object.values(object.colours)[Math.floor(Math.random() * Object.values(object.colours).length)];
        //const colour = object.colours[0];
        object.colour = rgbToMtlCoefficients(colour.r, colour.g, colour.b) as MtlCoefficients;

        const direction = Object.values(object.directions)[Math.floor(Math.random() * Object.values(object.directions).length)];
        //const direction = object.directions.back;
        object.rotation = {
            "y": Math.random() * (direction.max - direction.min) + direction.min,
            "x": Math.random() * (object.rotation_range.x.max - object.rotation_range.x.min) + object.rotation_range.x.min
        }

        render(object, (buffer: Buffer) => {
            sharp(background)
            .composite([
                { input: buffer, blend: 'over' },
                { input: overlay, blend: 'over'}
            ])
            .toFile('./tests/complete.jpg', (err: Error) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Layered image saved');
                }
            });
        }) 


        return { };
    }

    validate(userAnswer: string, encryptedAnswer: string): boolean {

        return true;
    }
}