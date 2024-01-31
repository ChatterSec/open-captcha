const { Object3D } = require('../core/Object3D.js');

class Group extends Object3D {

	constructor() {

		super();

		this.isGroup = true;

		this.type = 'Group';

	}

}

module.exports = { Group };
