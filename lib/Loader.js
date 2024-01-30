const {DefaultLoadingManager} = require( './LoadingManager.js' );

class Loader {

	constructor( manager ) {

		this.manager = ( manager !== undefined ) ? manager : DefaultLoadingManager;

		this.crossOrigin = 'anonymous';
		this.withCredentials = false;
		this.path = '';
		this.resourcePath = '';
		this.requestHeader = {};

	}

	load( /* url, onLoad, onProgress, onError */ ) {}

	loadAsync( url, onProgress ) {

		const scope = this;

		return new Promise( function ( resolve, reject ) {

			scope.load( url, resolve, onProgress, reject );

		} );

	}

	parse( /* data */ ) {}


	setPath( path ) {

		this.path = path;
		return this;

	}

	setResourcePath( resourcePath ) {

		this.resourcePath = resourcePath;
		return this;

	}

	setRequestHeader( requestHeader ) {

		this.requestHeader = requestHeader;
		return this;

	}

}

Loader.DEFAULT_MATERIAL_NAME = '__DEFAULT';

module.exports = Loader;