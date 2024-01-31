const { render } = require('../dist/src/render');
const { writeFileSync, readFileSync } = require('fs');
const sharp = require('sharp');
 
const object = 'pawn';

render(object, (buffer) => {

    const imageXBuffer = readFileSync('./assets/jpg/bg.1.jpg');

    sharp(imageXBuffer)
    .composite([{ input: buffer, blend: 'over' }])
    .toFile('test.2.jpg', (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Layered image saved');
        }
    });

    writeFileSync('./test.png', buffer);
    console.log('Generated image')
}) 