import {randomBytes, createCipheriv, createDecipheriv} from "crypto";

function encrypt(text: string, key: Buffer, iv: Buffer): string {
    const cipher = createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }
  
  function decrypt(encryptedText: string, key: Buffer, iv: Buffer): string {
    const decipher = createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
  }
 
export default class captcha {
    #_encryptionKey: Buffer;
    #_encryptionIv: Buffer;

    constructor() {
        this.#_encryptionKey = randomBytes(32);
        this.#_encryptionIv = randomBytes(16);
    }

    generate(): object {
        return {
            question: '4 + 4',
            answer: encrypt("4", this.#_encryptionKey, this.#_encryptionIv),
        };
    }

    validate(userAnswer: string, encryptedAnswer: string): boolean {
        const answer = decrypt(encryptedAnswer, this.#_encryptionKey, this.#_encryptionIv);
        return userAnswer === answer;
    }
}