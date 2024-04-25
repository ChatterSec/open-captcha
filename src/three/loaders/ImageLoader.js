const fs = require('fs');
const {Loader} = require('./Loader');
const Canvas = require('canvas');

class ImageLoader extends Loader {
  constructor(manager) {
    super(manager);
  }

  async load(url, onLoad, onProgress, onError) {
	// console.log('ImageLoader Requested:', url);
	const scope = this;
  
	const imageData = new Promise((res) => {
	  fs.readFile(url, (err, data) => {
		if (err) {
		  // Handle error
		} else {
		  scope.manager.itemStart(url);
		  const imageBase64 = 'data:image/png;base64,' + data.toString('base64');
			scope.manager.itemEnd(url);
		  onLoad(imageBase64)
		}
	  });
	})
  
	return await imageData;
  }
};

module.exports = { ImageLoader }