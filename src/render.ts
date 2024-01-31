import * as fs from 'fs';

const FOUR = require('../../four.js/Four');
const { createCanvas } = require('../../canvas');
const { OBJLoader } = require('../../four.js/loaders/OBJLoader.js');
const { MTLLoader } = require('../../four.js/loaders/MTLLoader.js');
const objectsData = require('../objects.json');


const width = 512, height = 512;

function getRandomNumberBetween(x: number, y: number): number {
    return Math.floor(Math.random() * (y - x + 1)) + x;
}

export function render(object: string, callback: Function) {

    const objectData = objectsData[object]
    console.log(objectData)
    console.log(getRandomNumberBetween(objectData['rotation_range']['y']['min'], objectData['rotation_range']['y']['max']))

    const scene = new FOUR.Scene();
    const camera = new FOUR.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 4;

    // Lighting
    const light = new FOUR.PointLight(0x404040, 5, 10000000)
    light.position.set(-5, 15, 25)
    light.castShadow = true
    light.power = 1000000
    scene.add(light)

    const canvas = createCanvas(width, height);
    const renderer = new FOUR.WebGLRenderer({
        canvas,
        alpha: true,
    });

    const mtlLoader = new MTLLoader();

    mtlLoader.load(
        `./models/${objectData.model}.mtl`,
        async function (material: any) {

            material.preload();
            const objLoader = new OBJLoader();
            objLoader.setMaterials(material);

            objLoader.load(
                `./models/${objectData.model}.obj`,
                function (object: any) {
                    console.log('Loaded object')
                    const mesh = object.children[0]

                    mesh.rotation.y = Math.PI / getRandomNumberBetween(objectData['rotation_range']['y']['min'], objectData['rotation_range']['y']['max']);
                    mesh.rotation.x = Math.PI / getRandomNumberBetween(objectData['rotation_range']['x']['min'], objectData['rotation_range']['x']['max']);

                    mesh.position.y = -0.5;
                    mesh.position.z = 0.5;
                    mesh.position.x = 0.2;

                    scene.add(mesh);
                    renderer.render(scene, camera);
                    const buffer = canvas.toBuffer('image/png');
                    callback(buffer)
                },
                () => { },
                function (error: any) {
                    console.log('An error happened', error);
                }
            );
        },
        () => { },
        function (error: any) {
            console.log('An error happened', error);
        }
    );
}