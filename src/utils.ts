import Jimp from 'jimp';
import { MtlCoefficients } from './interface';

function rgbToMtlCoefficients(r: number, g: number, b: number): MtlCoefficients {
    const Ka = [r / 255, g / 255, b / 255];
    const Kd = [r / 255, g / 255, b / 255];
    const Ks = [r / 255, g / 255, b / 255];
    const Ke = [r / 255, g / 255, b / 255];
	return { Ka, Kd, Ks, Ke }
}

async function addAlpha(buffer:Buffer,alpha:number): Promise<Buffer> {
    const image = await Jimp.read(buffer);
    image.opacity(alpha);
    return await image.getBufferAsync(Jimp.MIME_PNG);
}

export { rgbToMtlCoefficients, addAlpha }