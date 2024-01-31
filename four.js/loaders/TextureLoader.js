const { ImageLoader } = require('./ImageLoader.js');
const { Texture } = require('../textures/Texture.js');
const { Loader } = require('./Loader.js');

class TextureLoader extends Loader {

	constructor( manager ) {

		super( manager );

	}

	async load( url, onLoad, onProgress, onError ) {
		console.log('Called texture loader load')

		const texture = new Texture();

		const loader = new ImageLoader( this.manager );
		loader.setPath( this.path );

		await loader.load( url, function ( image ) {
			texture.image = image;
			texture.needsUpdate = true;

			if ( onLoad !== undefined ) {

				onLoad( texture );

			}

		}, onProgress, onError );

		return texture;

	}

}


module.exports = { TextureLoader };
