class Uniform {

	constructor( value ) {

		this.value = value;

	}

	clone() {

		return new Uniform( this.value.clone === undefined ? this.value : this.value.clone() );

	}

}

module.exports = { Uniform };
