interface ObjectData {
    name: string,
    obj: string
    mtl: string
    newmtl_replace: string,
    camera: number,
    rotation_range: {
        x: {
            min: number,
            max: number
        }
    },
    directions: {
        name: string,
        min: number,
        max: number
    }[],
    rotation: {
        x: number,
        y: number
    },
    colour: {
        Ka: number[],
        Kd: number[],
        Ks: number[],
        Ke: number[]
    }
    colours: {
        name: string,
        r: number,
        g: number,
        b: number
    }[]
}

interface MtlCoefficients {
    Ka: number[],
    Kd: number[],
    Ks: number[],
    Ke: number[]
}

interface canvasType {
    toBuffer: (arg0: string) => Buffer
}

interface Captcha {
    generate: () => Promise<{
        anwser: {
            model: string, 
            colour: string, 
            direction: string, 
            token: string
        },
        images: {
            base64: string, 
            token: string
        }[]
    }> | any
}

export { 
    ObjectData, 
    MtlCoefficients, 
    canvasType, 
    Captcha
}