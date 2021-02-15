const canvasSketch = require('canvas-sketch');
const { createCanvas } = require('canvas-aws-prebuilt');

const canvas = createCanvas();

const defaultSettings = {
  canvas,
};

canvasSketch(sketch, settings).then(() => {
  // Once sketch is loaded & rendered, stream a PNG with node-canvas
  const out = fs.createWriteStream('output.png');
  const stream = canvas.createPNGStream();
  stream.pipe(out);
  out.on('finish', () => console.log('Done rendering'));
});

module.exports = function render({ sketch, settings }) {
  return canvasSketch(sketch, { ...defaultSettings, ...settings }).then(() => {
    const buffer = canvas.toBuffer('image/png', {
      compressionLevel: 3,
      filters: canvas.PNG_FILTER_NONE,
    });
    return buffer;
  });
};
