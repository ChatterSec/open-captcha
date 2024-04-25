const { LightShadow } = require('./LightShadow.js');
const { OrthographicCamera } = require('../cameras/OrthographicCamera.js');

class DirectionalLightShadow extends LightShadow {

	constructor() {

		super( new OrthographicCamera( - 5, 5, 5, - 5, 0.5, 500 ) );

		this.isDirectionalLightShadow = true;

	}

}

module.exports = { DirectionalLightShadow };
