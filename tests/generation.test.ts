const Captcha = require('../dist/src/captcha');
const oCaptcha = new Captcha();

const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

it('Do we get 6 images', async () => {
    const generation = await oCaptcha.generate()
    expect(generation.images).toHaveLength(6)
});

it('Are all the images valid base64?', async () => {
    const generation = await oCaptcha.generate()

    for (let i = 0; i < generation.images.length; i++) {
        const image = generation.images[i];
        expect(base64regex.test(image.base64.split('base64,').pop())).toBeTruthy()
    }
})