interface ObjectData {
    "name": string,
    "obj": string
    "mtl": string
    "newmtl_replace": string,
    "camera": number,
    "rotation_range": {
        "x": {
            "min": number,
            "max": number
        }
    },
    "directions": {
        "name": string,
        "min": number,
        "max": number
    }[],
    "rotation": {
        "x": number,
        "y": number
    },
    "colour": {
        "Ka": number[],
        "Kd": number[],
        "Ks": number[],
        "Ke": number[]
    }
    "colours": {
        "name": string,
        "r": number,
        "g": number,
        "b": number
    }[]
}

interface MtlCoefficients {
    "Ka": number[],
    "Kd": number[],
    "Ks": number[],
    "Ke": number[]
}

export { ObjectData, MtlCoefficients }