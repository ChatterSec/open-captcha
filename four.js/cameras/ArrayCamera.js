const { PerspectiveCamera } = require('./PerspectiveCamera.js');

class ArrayCamera extends PerspectiveCamera {

	constructor( array = [] ) {

		super();

		this.isArrayCamera = true;

		this.cameras = array;

	}

}

module.exports = { ArrayCamera };
