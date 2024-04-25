const { ShaderMaterial } = require('./ShaderMaterial.js');

class RawShaderMaterial extends ShaderMaterial {

	constructor( parameters ) {

		super( parameters );

		this.isRawShaderMaterial = true;

		this.type = 'RawShaderMaterial';

	}

}

module.exports = { RawShaderMaterial };
