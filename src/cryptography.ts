import { createCipheriv, createDecipheriv } from 'crypto';

// Error handling implmented thanks to Danial
// https://stackoverflow.com/a/25852077/16701094

function encrypt(text: string, key: Buffer, iv: Buffer): string | null {
    try {
        const Cipher = createCipheriv('aes-256-cbc', key, iv)
        let encrypted = Cipher.update(text, 'utf-8', 'hex');
        encrypted += Cipher.final('hex');
        return encrypted;
    } catch (error) {
        console.log(text)
        console.log(error)
        return null;
    }
}

function decrypt(encryptedText: string, key: Buffer, iv: Buffer): string | null {
    try {
        const Decipher = createDecipheriv('aes-256-cbc', key, iv)
        let decrypted = Decipher.update(encryptedText, 'hex', 'utf-8');
        decrypted += Decipher.final('utf-8');
        return decrypted;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export { 
    encrypt, 
    decrypt
}