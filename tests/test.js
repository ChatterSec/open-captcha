const { render } = require('../dist/render');
const { rgbToMtlCoefficients } = require('../dist/utils');
const { writeFileSync, readFileSync } = require('fs');
const sharp = require('sharp');
const objects = require('../models/objects.json');

const selectedModel = 'car'

/*for (let i = 0; i < 10; i++) {

    let object = Object.assign({}, objects[selectedModel]);
    const colour = Object.values(object.colours)[Object.keys(object.colours)[Math.floor(Math.random() * Object.values(object.colours).length)]];
    const mtlCoefficients = rgbToMtlCoefficients(colour.r, colour.g, colour.b);

    object.colour = mtlCoefficients;
    
    object.rotation = {
        "y": Math.random() * (object.rotation_range.y.max - object.rotation_range.y.min) + object.rotation_range.y.min,
        "x": Math.random() * (object.rotation_range.x.max - object.rotation_range.x.min) + object.rotation_range.x.min
    }

    delete object.colours;
    delete object.rotation_range;


    console.time(`Render time ${i}`);

    render(object, (buffer) => {
        console.timeEnd(`Render time ${i}`);
        writeFileSync(`./tests/bare.${i}.png`, buffer)
    }) 
    
}*/

/* console.time('Render time 1');
console.time('Render time 2');
console.time('Render time 3'); */

/* render(object, (buffer) => {

    console.timeEnd('Render time 1');
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
})  */


const { generateImage } = require('../dist/background');

const background = generateImage();

let object = Object.assign({}, objects[selectedModel]);
const colour = Object.values(object.colours)[Object.keys(object.colours)[Math.floor(Math.random() * Object.values(object.colours).length)]];
const mtlCoefficients = rgbToMtlCoefficients(colour.r, colour.g, colour.b);

object.colour = mtlCoefficients;

// const direction = Object.values(object.directions)[Math.floor(Math.random() * Object.values(object.directions).length)];
const direction = object.directions.back;

object.rotation = {
    "y": Math.random() * (direction.max - direction.min) + direction.min,
    "x": Math.random() * (object.rotation_range.x.max - object.rotation_range.x.min) + object.rotation_range.x.min
}

delete object.colours;
delete object.rotation_range;

render(object, (buffer) => {
    sharp(background)
    .composite([{ input: buffer, blend: 'over' }])
    .toFile('./tests/complete.jpg', (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Layered image saved');
        }
    });
}) 