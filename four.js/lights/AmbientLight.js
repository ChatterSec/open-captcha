const { Light } = require('./Light.js');

class AmbientLight extends Light {

	constructor( color, intensity ) {

		super( color, intensity );

		this.isAmbientLight = true;

		this.type = 'AmbientLight';

	}

}

module.exports = { AmbientLight };
