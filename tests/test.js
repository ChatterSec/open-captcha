const { render } = require('../dist/src/render');
const { writeFileSync, readFileSync } = require('fs');
const sharp = require('sharp');
 
const object = 'car';

render(object, (buffer) => {

    const imageXBuffer = readFileSync('./assets/jpg/bg.1.jpg');

    sharp(imageXBuffer)
    .composite([{ input: buffer, blend: 'over' }])
    .toFile('./tests/complete.jpg', (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Layered image saved');
        }
    });

    writeFileSync('./tests/bare.png', buffer);
    console.log('Generated image')
}) 