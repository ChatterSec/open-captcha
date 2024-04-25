import { createCipheriv, createDecipheriv } from 'crypto';

// Error handling implmented thanks to Danial
// https://stackoverflow.com/a/25852077/16701094

function encrypt(text: string, keys: Buffer[], ivs: Buffer[]): string | null {
    const key = keys[keys.length - 1];
    const iv = ivs[ivs.length - 1];

    try {
        const Cipher = createCipheriv('aes-256-cbc', key, iv)
        let encrypted = Cipher.update(text, 'utf-8', 'hex');
        encrypted += Cipher.final('hex');
        return encrypted;
    } catch (error) {
        console.log(error)
        return null;
    }
}

function decrypt(encryptedText: string, keys: Buffer[], ivs: Buffer[]): string | null | undefined {

    // Input validation to ensure we have the correct
    // amount of keys and ivs.

    if (keys.length === 0 || ivs.length === 0) {
        console.error('You must supply atleast 1 key and iv');
        return null;
    }

    if (keys.length !== ivs.length) {
        console.error('You must supply the same amount of keys as ivs');
        return null;
    }

    // Since the encryption script gets the last 
    // elements of both keys and ivs we can assume
    // the key and iv will be the later elements in
    // the array, so just reverse the order.

    keys.reverse()
    ivs.reverse()

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const iv = ivs[i];

        try {
            const Decipher = createDecipheriv('aes-256-cbc', key, iv)
            let decrypted = Decipher.update(encryptedText, 'hex', 'utf-8');
            decrypted += Decipher.final('utf-8');
            return decrypted;
        } catch (error: any) {
            if (error.code !== 'ERR_OSSL_BAD_DECRYPT') {
                console.error(error)
            }
        }

        // If we get to the last key and iv and still
        // havent decrypted it then there is an issue 
        // so just return null.

        if (i === keys.length -1) {
            return null;
        }
        
    }
}

export { 
    encrypt, 
    decrypt
}