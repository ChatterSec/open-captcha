import { render } from './render';
import { writeFileSync, readFileSync } from 'fs';

const sharp = require('sharp');
 
const object = 'pawn';

render(object, (buffer: Buffer) => {

    const imageXBuffer = readFileSync('./assets/jpg/bg.1.jpg');

    sharp(imageXBuffer)
    .composite([{ input: buffer, blend: 'over' }])
    .toFile('test.2.png', (err: any) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Layered image saved');
        }
    });

    writeFileSync('./test.png', buffer);
    console.log('Generated image')
}) 