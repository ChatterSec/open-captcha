import createCanvas from './canvas';
import { canvasType } from './interface'
import { getRandomValues as randomValues } from 'node:crypto';
import { rSelect } from './utils';

function generateCanvasPromise(w: number, h: number, z: number) {
    const canvas = createCanvas(w, h, 'png');
    const ctx = canvas.getContext('2d');

    // If z is 0 then add a background color that covers the entire canvas,
    // this is to make sure that the image is not transparent.

    if (z === 0) {

        // Pre-generate random colors and numbers to make the image generation faster.

        const colors = Array.from({ length: 104 }, () => `#${Math.floor(Math.random() * 16777215).toString(16)}`);
        const randomNumbers = randomValues(new Uint32Array(400));
        const perfectNumber = 4294967295 // https://en.wikipedia.org/wiki/4,294,967,295

         // Top left
        ctx.fillStyle = colors[0];
        ctx.fillRect(0, 0, w/2, h/2);

        // Top right
        ctx.fillStyle = colors[1];
        ctx.fillRect(w/2, 0, w, h/2);

        // Bottom left
        ctx.fillStyle = colors[2];
        ctx.fillRect(0, h/2, w/2, h);

        // Bottom right
        ctx.fillStyle = colors[3];
        ctx.fillRect(w/2, h/2, w, h);

        return Promise.all(Array.from({ length: 100 }, (_, i) => new Promise<void>((resolve) => {
            const x = Math.floor((randomNumbers[i] / perfectNumber) * w);
            const y = Math.floor((randomNumbers[i + 100] / perfectNumber) * h);
            const width = Math.floor((randomNumbers[i + 200] / perfectNumber) * 100);
            const height = Math.floor((randomNumbers[i + 300] / perfectNumber) * 100);
    
            ctx.fillStyle = colors[i+4];
            ctx.fillRect(x, y, width, height);
    
            resolve();
        }))).then(() => canvas);
    }

    if (z === 1) {

        // Pre-generate random colors and numbers to make the image generation faster.

        const colors = Array.from({ length: 1000 }, () => `#${Math.floor(Math.random() * 16777215).toString(16)}`);
        const randomNumbers = randomValues(new Uint32Array(4000));
        const perfectNumber = 4294967295 // https://en.wikipedia.org/wiki/4,294,967,295

        return Promise.all(Array.from({ length: 1000 }, (_, i) => new Promise<void>((resolve) => {
            const x = Math.floor((randomNumbers[i] / perfectNumber) * w);
            const y = Math.floor((randomNumbers[i + 1000] / perfectNumber) * h);
            const width = Math.floor((randomNumbers[i + 2000] / perfectNumber) * 100);
            const height = Math.floor((randomNumbers[i + 3000] / perfectNumber) * 100);
    
            ctx.beginPath();
            ctx.fillStyle = colors[i];
            ctx.rect(x, y, width, height);
            ctx.fill();
    
            resolve();
        }))).then(() => canvas);
    }

    return canvas;
}

async function generateImage(canvas: canvasType | null = null, w: number, h: number, z: number): Promise<Buffer> {
    if (!canvas) canvas = await generateCanvasPromise(w, h, z) as canvasType;
    const buffer = canvas.toBuffer('image/png');
    return buffer;
}

export { generateImage }