import { createCipheriv, createDecipheriv } from 'crypto';

function encrypt(text: string, keys: Buffer[], ivs: Buffer[]): string | null {

    // Get the last element of the keys and ivs since these are the newest keys and will,
    // last for up to 1 hour.

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

    const keysCount = keys.length;
    const ivsCount = ivs.length;

    // Input validation to ensure we have the correct
    // amount of keys and ivs.

    if (keysCount === 0 || ivsCount === 0) {
        console.error('You must supply atleast 1 key and iv');
        return null;
    }

    if (keysCount !== ivsCount) {
        console.error('You must supply the same amount of keys as ivs');
        return null;
    }

    // Since the encryption script gets the last 
    // elements of both keys and ivs we can assume
    // the key and iv will be the later elements in
    // the array, so just reverse the order.

    keys.reverse()
    ivs.reverse()

    for (let i = 0; i < keysCount; i++) {
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

        if (i === keysCount - 1) {
            return null;
        }

    }
}

export {
    encrypt,
    decrypt
}