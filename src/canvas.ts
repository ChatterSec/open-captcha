const {
  Canvas,
  Image
} = require('canvas');
const createGLContext = require('gl');

import EventEmitter from 'events';
import jsdom from 'jsdom';

const JSdom = new jsdom.JSDOM();

global.window = JSdom.window as unknown as Window & typeof globalThis;
global.document = JSdom.window.document;

const _ctx = Symbol('ctx') as any as string;

function putImageData(gl: any, canvas: any) {
  const {
      width,
      height
  } = canvas;
  const ctx = canvas[_ctx];
  const data = ctx.getImageData(0, 0, width, height);
  const pixels = new Uint8Array(width * height * 4);
  gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
  for (let i = 0; i < height; i += 1) {
      for (let j = 0; j < width; j += 1) {
          const col = j;
          const row = height - i - 1;
          for (let k = 0; k < 4; k += 1) {
              const idx = 4 * (row * width + col) + k;
              const idx2 = 4 * (i * width + col) + k;
              data.data[idx] = pixels[idx2]
          }
      }
  }
  ctx.putImageData(data, 0, 0);
  return ctx
}

class NodeCanvasElement extends Canvas {
  constructor(...args: any[]) {
      super(...args);
      this.__event__ = new EventEmitter();
      this.__attributes__ = {};
      this.style = {}
  }
  get width() {
      return super.width
  }
  set width(value) {
      if (this.__gl__) {
          const ext = this
              .__gl__
              .getExtension('STACKGL_resize_drawingbuffer');
          ext.resize(value, this.height)
      }
      super.width = value
  }
  get height() {
      return super.height
  }
  set height(value) {
      if (this.__gl__) {
          const ext = this
              .__gl__
              .getExtension('STACKGL_resize_drawingbuffer');
          ext.resize(this.width, value)
      }
      super.height = value
  }
  get clientWidth() {
      return super.width
  }
  get clientHeight() {
      return super.height
  }
  get __ctx__() {
      const gl = this.__gl__;
      if (gl) {
          putImageData(gl, this)
      }
      return this[_ctx]
  }

  getContext(type: string, options: any = {}) {
      if (this.__contextType__ && this.__contextType__ !== type) {
          return null
      }
      if (this.__gl__) {
          return this.__gl__
      }
      this.__contextType__ = type;
      if (type === 'webgl' || type === 'webgl2') {
          const {
              width,
              height
          } = this;
          this[_ctx] = super.getContext('2d', options);
          const ctx = createGLContext(width, height, options);
          const _getUniformLocation = ctx.getUniformLocation;
          ctx.getUniformLocation = function(program: any, name: string) {
              if (program._uniforms && !/\[\d+\]$/.test(name)) {
                  const reg = new RegExp(`${name}\\[\\d+\\]$`);
                  for (let i = 0; i < program._uniforms.length; i += 1) {
                      const _name = program._uniforms[i].name;
                      if (reg.test(_name)) {
                          name = _name
                      }
                  }
              }
              return _getUniformLocation.call(this, program, name)
          };
          ctx.canvas = this;
          const _tetImage2D = ctx.texImage2D;
          ctx.texImage2D = function(...args: any[]) {
              let pixels = args[args.length - 1];
              if (pixels && pixels._image) {
                  pixels = pixels._image
              }
              if (pixels instanceof Image) {
                  const canvas = new Canvas(pixels.width, pixels.height);
                  canvas
                      .getContext('2d')
                      .drawImage(pixels, 0, 0);
                  args[args.length - 1] = canvas
              }
              return _tetImage2D.apply(this, args)
          };
          this.__gl__ = ctx;
          return this.__gl__
      }
      return super.getContext(type, options)
  }

  toBuffer(...args: any[]) {
      const gl = this.__gl__;
      if (gl) {
          putImageData(gl, this)
      }
      return super.toBuffer(...args)
  }

  addEventListener(type: string, listener: any) {
      return this
          .__event__
          .addListener(type, listener)
  }
}

export default (width: number, height: number, type: string) => {
  return new NodeCanvasElement(width, height, type)
}