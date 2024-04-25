import createCanvas from './canvas';
import { canvasType } from './interface'
import { getRandomValues } from 'node:crypto';

/* function generateCanvas(w: number, h: number) {
    const canvas = createCanvas(w, h, 'png');
    const context = canvas.getContext('2d');

    for (let i = 0; i < 1000; i++) {
        const x = Math.floor(Math.random() * canvas.width);
        const y = Math.floor(Math.random() * canvas.height);
        const width = Math.floor(Math.random() * 100);
        const height = Math.floor(Math.random() * 100);
        const color = `#${Math.floor(Math.random()*16777215).toString(16)}`;

        context.fillStyle = color;
        context.fillRect(x, y, width, height);
    }

    return canvas;
}

function generateCanvasOptimised(w: number, h: number) {
    const canvas = createCanvas(w, h, 'png');
    const context = canvas.getContext('2d');

    const colors = Array.from({length: 1000}, () => `#${Math.floor(Math.random()*16777215).toString(16)}`);
    const randomNumbers = new Uint32Array(4000);

    getRandomValues(randomNumbers);

    for (let i = 0; i < 1000; i++) {
        const x = Math.floor((randomNumbers[i] / 4294967295) * canvas.width);
        const y = Math.floor((randomNumbers[i + 1000] / 4294967295) * canvas.height);

        const width = Math.floor((randomNumbers[i + 2000] / 4294967295) * 100);
        const height = Math.floor((randomNumbers[i + 3000] / 4294967295) * 100);
        const color = colors[i];

        context.fillStyle = color;
        context.fillRect(x, y, width, height);
    }

    return canvas;
} */

function generateCanvasPromise(w: number, h: number) {
    const canvas = createCanvas(w, h, 'png');
    const context = canvas.getContext('2d');

    const colors = Array.from({length: 1000}, () => `#${Math.floor(Math.random()*16777215).toString(16)}`);
    const randomNumbers = new Uint32Array(4000);

    getRandomValues(randomNumbers);

    const promises = Array.from({length: 1000}, (_, i) => new Promise<void>((resolve) => {
        const x = Math.floor((randomNumbers[i] / 4294967295) * canvas.width);
        const y = Math.floor((randomNumbers[i + 1000] / 4294967295) * canvas.height);
        
        const width = Math.floor((randomNumbers[i + 2000] / 4294967295) * 100);
        const height = Math.floor((randomNumbers[i + 3000] / 4294967295) * 100);
        const color = colors[i];

        context.fillStyle = color;
        context.fillRect(x, y, width, height);
        
        resolve();
    }));

    return Promise.all(promises).then(() => canvas);
}

async function generateImage(canvas: canvasType | null = null, w:number, h:number): Promise<Buffer> {
    if (!canvas) {
        canvas = await generateCanvasPromise(w, h) as canvasType;
    }

    const buffer = canvas.toBuffer('image/png');
    return buffer;
}

export { generateImage }