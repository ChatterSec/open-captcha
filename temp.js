function rgbToMtlCoefficients(r, g, b) {
    // Normalize the components to a value between 0 and 1
    const Ka = [r / 255, g / 255, b / 255];
    const Kd = [r / 255, g / 255, b / 255];
    const Ks = [r / 255, g / 255, b / 255];
    const Ke = [r / 255, g / 255, b / 255];

    return { Ka, Kd, Ks, Ke };
}