const { WebGLRenderTarget } = require('./WebGLRenderTarget.js');
const { Data3DTexture } = require('../textures/Data3DTexture.js');

class WebGL3DRenderTarget extends WebGLRenderTarget {

	constructor( width = 1, height = 1, depth = 1, options = {} ) {

		super( width, height, options );

		this.isWebGL3DRenderTarget = true;

		this.depth = depth;

		this.texture = new Data3DTexture( null, width, height, depth );

		this.texture.isRenderTargetTexture = true;

	}

}

module.exports = { WebGL3DRenderTarget };
