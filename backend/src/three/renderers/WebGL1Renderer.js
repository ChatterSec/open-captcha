const { WebGLRenderer } = require('./WebGLRenderer.js');

class WebGL1Renderer extends WebGLRenderer {}

WebGL1Renderer.prototype.isWebGL1Renderer = true;

module.exports = { WebGL1Renderer };
