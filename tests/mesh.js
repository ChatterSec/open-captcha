const fs = require('fs');
const THREE = require('three');
const {createCanvas} = require('../canvas');

const OBJLoader = require('../lib/OBJLoader');
const MTLLoader = require('../lib/MTLLoader');
const CubeTextureLoader = require('../lib/CubeTextureLoader');

const width = 512, height = 512;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xFFFFFF);

const cubeTextureLoader = new CubeTextureLoader();
const backgroundTexture = cubeTextureLoader.load(['../assets/jpg/bg.0.jpg']);
console.log(backgroundTexture)
scene.background = backgroundTexture;

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.z = 5;

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
const cube = new THREE.Mesh(geometry, material);
cube.position.z = 2
cube.position.y = 1
cube.position.x = 0
//scene.add(cube);


const light = new THREE.PointLight(0x404040, 10000)
light.position.set(0, 20, 0)
light.castShadow = true
light.power = 1000000
scene.add(light)

const Alight = new THREE.AmbientLight( 0x404040, 1000 );
Alight.position.set(0, 10, 10)
scene.add( Alight );


const canvas = createCanvas(width, height);
const renderer = new THREE.WebGLRenderer({
  canvas,
});

const mtlLoader = new MTLLoader();
mtlLoader.load(
	'./assets/mtl/police.mtl',
	async function ( material ) {
        console.log('Loaded material')
        await material.preload();

        await new Promise(res=>setTimeout(res, 1000))
        
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
                //mesh.rotation.z = Math.PI / 5;

                mesh.position.y = -0.5;
                mesh.position.z = 0.5;
                mesh.position.x = 0.2;

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