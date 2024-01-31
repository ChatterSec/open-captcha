const fs = require('fs');
const FOUR = require('../four.js/Four');
const {createCanvas} = require('../canvas');

const { OBJLoader } = require('../four.js/loaders/OBJLoader.js');
const { MTLLoader } = require('../four.js/loaders/MTLLoader.js');

const width = 512, height = 512;

const scene = new FOUR.Scene();
scene.background = new FOUR.Color(0xFFFFFF);

const camera = new FOUR.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.z = 5;

const geometry = new FOUR.BoxGeometry(1, 1, 1);
const material = new FOUR.MeshBasicMaterial({color: 0x00ff00});
const cube = new FOUR.Mesh(geometry, material);
cube.position.z = 2
cube.position.y = 1
cube.position.x = 0
//scene.add(cube);

const light = new FOUR.PointLight(0x404040, 10000)
light.position.set(20, 5, 10)
light.castShadow = true
light.power = 1000000
scene.add(light)

const canvas = createCanvas(width, height);
const renderer = new FOUR.WebGLRenderer({
    canvas,
});

const renderImage = () => {
    renderer.render(scene, camera);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync('./test.png', buffer);
    console.log('Generated image')
}

const mtlLoader = new MTLLoader();
mtlLoader.load(
	'./models/police.mtl',
	async function ( material ) {
        console.log('Loaded material')
        await material.preload();
        
        const objLoader = new OBJLoader();
        objLoader.setMaterials(material);
        objLoader.load(
            './models/police.obj',
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
                renderImage()
        
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