const pizza = require('./sketches/pizza');
const render = require('./render');

exports.handler = async function (event, ctx, callback) {
  const { queryStringParameters } = event;

  return render(pizza)
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
      return callback(null, {
        statusCode: 400,
        headers,
        body: JSON.stringify(error),
      });
    });
};
