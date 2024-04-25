const { encrypt, decrypt } = require('../dist/src/cryptography');
const { randomBytes } = require('crypto');

const keys = [randomBytes(32), randomBytes(32), randomBytes(32), randomBytes(32)]
const ivs = [randomBytes(16), randomBytes(16), randomBytes(16), randomBytes(16)]

var hexReg = /[0-9A-Fa-f]/g;

it('Can encrypt', async () => {
    const encrypted = encrypt('test', keys, ivs)
    
    expect(encrypt === null).toBeFalsy()
    expect(encrypted).toBeDefined()
});

it('Encryption returns valid hex', async () => {
    expect(hexReg.test(encrypt('test', keys, ivs))).toBeTruthy()
});

it('Can decrypt encrypted string', async () => {
    const encrypted = encrypt('test', keys, ivs)
    const decrypted = decrypt(encrypted, keys, ivs)
    
    expect(encrypt === null).toBeFalsy()
    expect(encrypted).toBeDefined()
    expect(decrypted).toBe('test')
});
