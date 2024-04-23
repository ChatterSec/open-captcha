(async () => {
    const Captcha = require('../dist/src/captcha');
    const fs = require('fs');
    const oCaptcha = new Captcha();

    console.time('Generation')
    const generation = await oCaptcha.generate();
    console.timeEnd('Generation')

    if (!fs.existsSync('./out')) {
        fs.mkdirSync('./out');
    }

    for (let i = 0; i < generation.images.length; i++) {
        const image = generation.images[i];

        console.log(await oCaptcha.verify(image.token, generation.anwser.token))

        fs.writeFileSync(`./out/${i+1}.png`, image.base64.split('base64,').pop(), { encoding: 'base64'}, (err) => {
            if (err) {
                console.error(err);
            }
        });
    }
})()