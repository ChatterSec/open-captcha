const { Texture } = require('./Texture.js');
const { NearestFilter } = require('../constants.js');

class FramebufferTexture extends Texture {

	constructor( width, height ) {

		super( { width, height } );

		this.isFramebufferTexture = true;

		this.magFilter = NearestFilter;
		this.minFilter = NearestFilter;

		this.generateMipmaps = false;

		this.needsUpdate = true;

	}

}

module.exports = { FramebufferTexture };
