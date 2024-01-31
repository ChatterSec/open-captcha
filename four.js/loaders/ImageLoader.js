const fs = require('fs');
const {Loader} = require('./Loader');
const Canvas = require('canvas');
const { JSDOM } = require('jsdom');


class ImageLoader extends Loader {
  constructor(manager) {
    super(manager);
  }

  async load(url, onLoad, onProgress, onError) {
	console.log('ImageLoader Requested:', url);
	const scope = this;
  
	const imageData = new Promise((res) => {
	  fs.readFile(url, (err, data) => {
		if (err) {
		  // Handle error
		} else {
		  scope.manager.itemStart(url);
		  const imageBase64 = 'data:image/png;base64,' + data.toString('base64');
		  const dom = new JSDOM(`<!DOCTYPE html><body><img id="myimg" /></body>`);
		  const img = dom.window.document.getElementById('myimg');
		  img.onload = () => {
			const canvas = Canvas.createCanvas(img.width, img.height);
			const ctx = canvas.getContext('2d');
			ctx.drawImage(img, 0, 0, img.width, img.height);
			console.log('ImageLoader Loaded:', url);
			scope.manager.itemEnd(url);
			onLoad(canvas); // Pass the Canvas to the callback
		  };
		  img.src = imageBase64;
		}
	  });
	})
  
	return await imageData;
  }
};

module.exports = { ImageLoader }