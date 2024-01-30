const { Object3D } = require('../core/Object3D.js');

class Bone extends Object3D {

	constructor() {

		super();

		this.isBone = true;

		this.type = 'Bone';

	}

}

module.exports = { Bone };
