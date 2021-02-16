const pizza = require('./sketches/pizza');
const render = require('./render');

const sketches = { pizza };

exports.handler = async function (event, context) {
  const { queryStringParameters } = event;
  const { type, size } = queryStringParameters;
  const sketchConfig = sketches[type] || pizza;

  const dimensions = size
    ? size.split('x').map((s) => parseInt(s, 10))
    : [1280, 640];

  const settings = { ...sketchConfig.settings, dimensions };

  return render({ sketch: sketchConfig.sketch, settings })
    .then((imageBuffer) => {
      return {
        isBase64Encoded: true,
        statusCode: 200,
        headers: {
          'Content-Type': 'image/png',
          'Content-Length': imageBuffer.length.toString(),
        },
        body: imageBuffer.toString('base64'),
      };
    })
    .catch((error) => {
      console.log('error', error);
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      };
    });
};
