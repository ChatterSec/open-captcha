import sharp from 'sharp';
import { MtlCoefficients } from './interface';

function rgbToMtlCoefficients(r: number, g: number, b: number): MtlCoefficients {
    const Ka = [r / 255, g / 255, b / 255];
    const Kd = [r / 255, g / 255, b / 255];
    const Ks = [r / 255, g / 255, b / 255];
    const Ke = [r / 255, g / 255, b / 255];
	return { Ka, Kd, Ks, Ke }
}

async function addAlpha(buffer: Buffer, alpha: number): Promise<Buffer> {
    const image = sharp(buffer);
    const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });

    for (let i = 0; i < data.length; i += info.channels) {
        data[i + 3] = alpha * 255; // Assuming the image is in RGBA format
    }

    return await sharp(data, {
        raw: {
            width: info.width,
            height: info.height,
            channels: info.channels,
        },
    }).png().toBuffer();
}

export { rgbToMtlCoefficients, addAlpha }