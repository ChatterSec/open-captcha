import sharp from 'sharp';
import createCanvas from './canvas';
import { addAlpha } from './utils';
import { ObjectData } from './interface';
import { generateImage } from './filter';

// https://github.com/NotReeceHarris/open-captcha-four
const { Scene } = require('@open-captcha/fourjs/scenes/Scene.js');
const { OBJLoader } = require('@open-captcha/fourjs/loaders/OBJLoader.js');
const { MTLLoader } = require('@open-captcha/fourjs/loaders/MTLLoader.js');
const { PointLight } = require('@open-captcha/fourjs/lights/PointLight.js');
const { WebGL1Renderer } = require('@open-captcha/fourjs/renderers/WebGL1Renderer.js');
const { PerspectiveCamera } = require('@open-captcha/fourjs/cameras/PerspectiveCamera.js');

const width = 256;
const height = 256;

function createCamera(cameraPosition: number): any {
    const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = cameraPosition;
    camera.position.y = 1;
    return camera;
}

function createLight(): any {
    const light = new PointLight(0x404040, 5, 100);
    light.position.set(-5, 15, 25);
    light.castShadow = true;
    light.power = 1000000;
    return light;
}

function render(objectData: ObjectData, callback: (buffer: Buffer) => void): void {

    const scene = new Scene();
    const camera = createCamera(objectData.camera);
    const light = createLight();

    scene.add(light);

    const canvas = createCanvas(width, height, 'png');
    const renderer = new WebGL1Renderer({ canvas, alpha: true, precision: 'lowp' });
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
        }, undefined, (error: Error) => console.error('An error happened', error));
    }, undefined, (error: Error) => console.error('An error happened', error));
}

export default (object: ObjectData) => new Promise(async (resolve, reject) => {
    try {
        const background = generateImage(null, width, height);
        const overlayBase = generateImage(null, width, height);
        const overlay = await addAlpha(overlayBase, 0.3);

        render(object, (buffer: Buffer) => {
            sharp(background)
            .composite([
                { input: buffer, blend: 'over' },
                { input: overlay, blend: 'over'}
            ])
            .toBuffer()
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
        }) 
    } catch (error) {
        reject(error);
    }
}) as Promise<Buffer>;