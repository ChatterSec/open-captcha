const Canvas = require('./canvas');

function createCanvas(width: number, height: number, type: string) {
  return new Canvas(width, height, type);
}

export { createCanvas };