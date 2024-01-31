function rgbToMtlCoefficients(r: number, g: number, b: number): { Ka: number[], Kd: number[], Ks: number[], Ke: number[] }{
    const Ka = [r / 255, g / 255, b / 255];
    const Kd = [r / 255, g / 255, b / 255];
    const Ks = [r / 255, g / 255, b / 255];
    const Ke = [r / 255, g / 255, b / 255];
	return { Ka, Kd, Ks, Ke }
}

export { rgbToMtlCoefficients }