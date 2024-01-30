const fs = require('fs');
const THREE = require('three');
const {createCanvas} = require('../canvas');

const OBJLoader = require('../lib/OBJLoader');
const MTLLoader = require('../lib/MTLLoader');

const width = 512, height = 512;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xFFFFFF);

const cubeTextureLoader = new THREE.CubeTextureLoader();
const backgroundTexture = cubeTextureLoader.load('../assets/jpg/bg.0.jpg');
// console.log(backgroundTexture)
scene.background = backgroundTexture;

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.z = 5;

const light = new THREE.PointLight(0xffffff, 100)
light.position.set(0, 1, 15)
scene.add(light)

var ambientLight = new THREE.AmbientLight(0xffffff, 1000); // Color: white, Intensity: 1
scene.add(ambientLight);


const canvas = createCanvas(width, height);
const renderer = new THREE.WebGLRenderer({
  canvas,
});

const mtlLoader = new MTLLoader();
mtlLoader.load(
	'./assets/mtl/police.mtl',
	function ( material ) {
        console.log('Loaded material')
        material.preload();
        
        const objLoader = new OBJLoader();
        objLoader.setMaterials(material);
        objLoader.load(
            './assets/obj/police.obj',
            function ( object ) {
                console.log('Loaded object')
                const mesh = object.children[0]
                //mesh.material = new THREE.MeshBasicMaterial({color: 0x00ff00});
                mesh.material = material.materials.Material
                    
                // console.log(mesh.material.map)

                mesh.rotation.y = Math.PI / 2;
                mesh.rotation.x = Math.PI / 5;

                scene.add( mesh );
        
                // export to png
                renderer.render(scene, camera);
                const buffer = canvas.toBuffer('image/png');
                fs.writeFileSync('./test.png', buffer);
                console.log('Generated image')
        
            },
            function ( xhr ) {
                // console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            function ( error ) {
                console.log( 'An error happened', error );
            }
        );

	},
	function ( xhr ) {
		// console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	function ( error ) {
		console.log( 'An error happened', error );
	}
);