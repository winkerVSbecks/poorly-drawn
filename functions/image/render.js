const canvasSketch = require('canvas-sketch');
const { createCanvas } = require('canvas-aws-prebuilt');

const canvas = createCanvas();

const defaultSettings = {
  canvas,
};

module.exports = function render({ sketch, settings }) {
  return canvasSketch(sketch, { ...defaultSettings, ...settings }).then(() => {
    const buffer = canvas.toBuffer('image/png', {
      compressionLevel: 3,
      filters: canvas.PNG_FILTER_NONE,
    });
    return buffer;
  });
};
