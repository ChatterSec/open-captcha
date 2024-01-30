const ImageLoader = require('./ImageLoader.js');
const { Texture } = require('../four/textures/Texture.js');
const Loader = require('./Loader.js');

module.exports = class TextureLoader extends Loader {

	constructor( manager ) {

		super( manager );

	}

	load( url, onLoad, onProgress, onError ) {

		console.log('TextureLoader requested:', url)

		const texture = new Texture();

		const loader = new ImageLoader( this.manager );
		loader.setPath( this.path );

		loader.load( url, function ( image ) {

			texture.image = image;
			texture.needsUpdate = true;

			if ( onLoad !== undefined ) {

				onLoad( texture );

			}

		}, onProgress, onError );

		return texture;

	}

}