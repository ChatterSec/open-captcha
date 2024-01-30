const fs = require('fs');
const THREE = require('three');
const {createCanvas} = require('../canvas');

const OBJLoader = require('../lib/OBJLoader');
const MTLLoader = require('../lib/MTLLoader');

global.ProgressEvent = class ProgressEvent {
    constructor(type, {loaded, total}) {
        this.type = type;
        this.loaded = loaded;
        this.total = total;
    }
}

const width = 512, height = 512;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xFFFFFF);

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.z = 5;

const light = new THREE.PointLight(0xffffff, 1000)
light.position.set(2.5, 7.5, 15)
scene.add(light)

const canvas = createCanvas(width, height);
const renderer = new THREE.WebGLRenderer({
  canvas,
});

const mtlLoader = new MTLLoader();
mtlLoader.load(
	'https://raw.githubusercontent.com/NotReeceHarris/open-captcha/672009c239df3a1ef141d2626c835ec2e5dc2697/assets/police.mtl',
	function ( material ) {
        console.log('Loaded material')
        material.preload();
        
        const objLoader = new OBJLoader();
        objLoader.setMaterials(material);
        objLoader.load(
            'https://raw.githubusercontent.com/NotReeceHarris/open-captcha/main/assets/police.obj',
            function ( object ) {
                console.log('Loaded object')
   
                //console.log(material)
                // console.log(object)

                //object.children[0].material = material.materials.Material

                //console.log(material.materials.Material)
                scene.add( object );
        
                // export to png
                renderer.render(scene, camera);
                const buffer = canvas.toBuffer('image/png');
                fs.writeFileSync('./test.png', buffer);
        
            },
            function ( xhr ) {
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            function ( error ) {
                console.log( 'An error happened', error );
            }
        );

	},
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	function ( error ) {
		console.log( 'An error happened', error );
	}
);