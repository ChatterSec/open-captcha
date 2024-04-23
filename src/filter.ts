import createCanvas from './canvas';
import { canvasType } from './interface'

function generateCanvas(w: number, h: number) {
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

function generateImage(canvas: canvasType | null = null, w:number, h:number): Buffer {
    if (!canvas) {
        canvas = generateCanvas(w, h) as canvasType;
    }

    const buffer = canvas.toBuffer('image/png');
    return buffer;
}

export { generateImage }