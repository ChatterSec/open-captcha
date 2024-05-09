const { RenderTarget } = require ('../core/RenderTarget.js');

class WebGLRenderTarget extends RenderTarget {

	constructor( width = 1, height = 1, options = {} ) {

		super( width, height, options );

		this.isWebGLRenderTarget = true;

	}

}

module.exports = { WebGLRenderTarget };
