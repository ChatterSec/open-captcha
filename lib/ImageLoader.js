const fs = require('fs');
const Loader = require('./Loader');
const Canvas = require('canvas');

module.exports = class ImageLoader extends Loader {
  constructor(manager) {
    super(manager);
  }

  async load(url, onLoad, onProgress, onError) {
    console.log('ImageLoader Requested:', url);
    const scope = this;

    return await new Promise((res) => {
      fs.readFile(url, (err, data) => {
        if (err) {
  
        } else {
          const img = new Canvas.Image;
  
          scope.manager.itemStart( url );
  
          img.src = 'data:image/png;base64,' + data.toString('base64');
  
          // Export the canvas to test-color.png
          const canvas = Canvas.createCanvas(img.width, img.height);
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, img.width, img.height);
          const buffer = canvas.toBuffer('image/png');
          fs.writeFileSync('./test-color.png', buffer);
  
          res(img)
        }
      });
    })
  }
};