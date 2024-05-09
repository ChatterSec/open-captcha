import sharp from 'sharp';
import { MtlCoefficients } from './interface';
import { readFile } from 'fs';

function rgbToMtlCoefficients(r: number, g: number, b: number): MtlCoefficients {
    const k = [r / 255, g / 255, b / 255]
    return { Ka: k, Kd: k, Ks: k, Ke: k }
}

async function addAlpha(buffer: Buffer, alpha: number): Promise<Buffer> {
    const { data, info } = await sharp(buffer).raw().toBuffer({ resolveWithObject: true });

    for (let i = 0; i < data.length; i += info.channels) {
        data[i + 3] = alpha * 255;
    }

    return await sharp(data, {
        raw: {
            width: info.width,
            height: info.height,
            channels: info.channels,
        },
    }).png().toBuffer()
}

function rSelect(array: any[]) {
    return array[Math.floor(Math.random() * array.length)];
}

function objStats(filename: string): Promise<{ file: string, verticesCount: number, facesCount: number, normalsCount: number, texturesCount: number }> {
    return new Promise((resolve, reject) => {
        readFile(filename, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                let lines = data.split('\n');
                let verticesCount = lines.filter(line => line.startsWith('v ')).length;
                let facesCount = lines.filter(line => line.startsWith('f ')).length;
                let normalsCount = lines.filter(line => line.startsWith('vn')).length;
                let texturesCount = lines.filter(line => line.startsWith('vt')).length;
                resolve({file: filename, verticesCount, facesCount, normalsCount, texturesCount});
            }
        });
    });
}

export {
    rgbToMtlCoefficients,
    addAlpha,
    rSelect,
    objStats
}