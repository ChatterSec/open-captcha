import sharp from 'sharp';
import { MtlCoefficients } from './interface';

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

export { 
    rgbToMtlCoefficients, 
    addAlpha,
    rSelect
}