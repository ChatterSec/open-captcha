(async () => {
    const Captcha = require('../dist/src/captcha');
    const { randomBytes } = require('crypto');
    const fs = require('fs');
    const oCaptcha = new Captcha();

    console.time('Generation')
    const generation = await oCaptcha.generate();
    console.timeEnd('Generation')

    if (!fs.existsSync('./examples')) {
        fs.mkdirSync('./examples');
    }

    for (let i = 0; i < generation.images.length; i++) {
        const image = generation.images[i];

        console.log(await oCaptcha.verify(image.token, generation.anwser.token))

        fs.writeFileSync(`./examples/v0_1_x-${randomBytes(2).toString('hex')}.png`, image.base64.split('base64,').pop(), { encoding: 'base64'}, (err) => {
            if (err) {
                console.error(err);
            }
        });
    }
})()