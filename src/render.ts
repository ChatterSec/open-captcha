const FOUR = require('@open-captcha/fourjs'); // https://github.com/NotReeceHarris/open-captcha-four
const { createCanvas } = require('./canvas');
const { OBJLoader } = require('@open-captcha/fourjs/loaders/OBJLoader.js');
const { MTLLoader } = require('@open-captcha/fourjs/loaders/MTLLoader.js');

interface ObjectData {
    obj: string;
    mtl: string;
    newmtl_replace: string;
    camera: number;
    rotation: {
        y: number;
        x: number;
    };
    colour: {
        Ka: number[];
        Kd: number[];
        Ks: number[];
        Ke: number[];
    };
}

const width = 512;
const height = 512;

export function render(objectData: ObjectData, callback: (buffer: Buffer) => void): void {

    const scene = createScene();
    const camera = createCamera(objectData.camera);
    const light = createLight();
    scene.add(light);

    const canvas = createCanvas(width, height);
    const renderer = new FOUR.WebGL1Renderer({ canvas, alpha: true, precision: 'lowp' });

    const mtlLoader = new MTLLoader();
    mtlLoader.load(objectData, async (material: any) => {
        material.preload();
        const objLoader = new OBJLoader();
        objLoader.setMaterials(material);

        objLoader.load(`./models/${objectData.obj}`, (object: any) => {
            const mesh = object.children[0];
            mesh.rotation.y = objectData.rotation.y;
            mesh.rotation.x = objectData.rotation.x;

            scene.add(mesh);
            renderer.render(scene, camera);
            const buffer = canvas.toBuffer('image/png');
            callback(buffer);
        }, undefined, handleError);
    }, undefined, handleError);
}

function createScene(): any {
    return new FOUR.Scene();
}

function createCamera(cameraPosition: number): any {
    const camera = new FOUR.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = cameraPosition;
    camera.position.y = 1;
    return camera;
}

function createLight(): any {
    const light = new FOUR.PointLight(0x404040, 5, 100);
    light.position.set(-5, 15, 25);
    light.castShadow = true;
    light.power = 1000000;
    return light;
}

function handleError(error: any): void {
    console.error('An error happened', error);
}