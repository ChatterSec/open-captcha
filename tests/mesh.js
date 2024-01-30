const fs = require('fs');
const THREE = require('three');
const {createCanvas} = require('../canvas');
const OBJLoader = require('../lib/OBJLoader');

global.ProgressEvent = class ProgressEvent {
    constructor(type, {loaded, total}) {
        this.type = type;
        this.loaded = loaded;
        this.total = total;
    }
}

const width = 512,
  height = 512;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

const canvas = createCanvas(width, height);
const renderer = new THREE.WebGLRenderer({
  canvas,
});


const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

const loader = new OBJLoader();

// load a resource
loader.load(
	// resource URL
	'https://raw.githubusercontent.com/NotReeceHarris/open-captcha/main/assets/test.obj',
	// called when resource is loaded
	function ( object ) {

		scene.add( object );

        // export to png
        renderer.render(scene, camera);
        const buffer = canvas.toBuffer('image/png');
        fs.writeFileSync('./test.png', buffer);

	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);