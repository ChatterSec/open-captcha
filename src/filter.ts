const { createCanvas } = require('./canvas');

interface canvasType {toBuffer: (arg0: string) => Buffer}

function generateCanvas(/* Currently a placeholder code, needs improving */) {
    const canvas = createCanvas(512, 512);
    const context = canvas.getContext('2d');

    for (let i = 0; i < 10000; i++) {
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

function generateImage(canvas: canvasType | null = null): Buffer {
    if (!canvas) {
        canvas = generateCanvas() as canvasType;
    }

    const buffer = canvas.toBuffer('image/png');
    return buffer;
}

export { generateImage }