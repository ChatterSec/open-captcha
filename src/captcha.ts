import objects from '../models/objects.json';

import Render from './render';
import { randomBytes } from "crypto";
import { rgbToMtlCoefficients, rSelect } from "./utils";
import { decrypt, encrypt } from "./cryptography";
import { ObjectData, MtlCoefficients, Captcha } from "./interface";

const selectedModel = 'car'

module.exports = class captcha implements Captcha {
    #_encryptionKey: Buffer;
    #_encryptionIv: Buffer;
    #_token: Buffer;

    constructor() {
        this.#_encryptionKey = randomBytes(32);
        this.#_encryptionIv = randomBytes(16);
        this.#_token = randomBytes(32);
    }

    async generate() {
        const options = await Promise.all(Array.from({ length: 6 }, () => {
            return new Promise(async (res): Promise<any> => {
                let object = Object.assign({}, objects[selectedModel]) as ObjectData;

                const colour = rSelect(Object.values(object.colours));
                object.colour = rgbToMtlCoefficients(colour.r, colour.g, colour.b) as MtlCoefficients;

                const direction = rSelect(Object.values(object.directions));
                object.rotation = {
                    "y": Math.random() * (direction.max - direction.min) + direction.min,
                    "x": Math.random() * (object.rotation_range.x.max - object.rotation_range.x.min) + object.rotation_range.x.min
                }

                res({
                    model: object.name,
                    colour: colour.name,
                    direction: direction.name,
                    image: await Render(object),
                    token: (Buffer.concat([this.#_token, randomBytes(16)])).toString('hex')
                })
            })
        })) as {
            model: string,
            colour: string,
            direction: string,
            image: Buffer,
            token: string
        }[]

        const selected = rSelect(options);
        const encryptedAnswer = await encrypt(selected.token, this.#_encryptionKey, this.#_encryptionIv);

        if (!encryptedAnswer) {
            throw new Error('Failed to encrypt answer');
        }

        return {
            "images": options.map((option) => {
                return {
                    base64: 'data:image/png;base64,' + option.image.toString('base64').replace(/(\r\n|\n|\r)/gm, ""),
                    token: option.token
                }
            }),
            "anwser": {
                "model": selected.model,
                "colour": selected.colour,
                "direction": selected.direction,
                "token": encryptedAnswer
            },
        };
    }
}