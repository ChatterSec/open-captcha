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
cube.position.z = 1
cube.position.y = 1
cube.position.x = 0
//scene.add(cube);

const light = new FOUR.PointLight(0x404040, 5, 10000000)
light.position.set(-5, 15, 25)
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
	'./models/car.mtl',
	async function ( material ) {
        console.log('Loaded material')
        material.preload();
        material.materials.Material.texture = new FOUR.DataTexture('data:image/png;base64,' + fs.readFileSync('./models/colors.jpg').toString('base64'), 596, 602)
        console.log(material.materials.Material.texture)
        
        const objLoader = new OBJLoader();
        objLoader.setMaterials(material);
        objLoader.load(
            './models/car.obj',
            function ( object ) {
                console.log('Loaded object')
                const mesh = object.children[0]



                mesh.material.texture = new FOUR.DataTexture('data:image/png;base64,' + fs.readFileSync('./models/colors.jpg').toString('base64'), 596, 602)

                //console.log(mesh.material.texture)

                mesh.rotation.y = Math.PI / 1.3;
                mesh.rotation.x = Math.PI / 9;

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