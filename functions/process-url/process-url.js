const cloudinary = require('cloudinary').v2;
const qs = require('querystring');
cloudinary.config({
  cloud_name: 'dw7bfc3ox',
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

exports.handler = async function (event, ctx) {
  const { queryStringParameters } = event;
  console.log(queryStringParameters);
  try {
    // https://res.cloudinary.com/dw7bfc3ox/image/upload/v1612208099/shout-out-images/img-1.png
    const imageUrl = cloudinary.url(
      `${process.env.SHOUT_OUT_IMAGE_VERSION}/shout-out-images/img-1.png`,
      {
        // resouce_type: "raw"
        sign_url: true,
        // secure: true,
        custom_pre_function: {
          function_type: 'remote',
          source: `https://sb-shoutout.netlify.app/.netlify/functions/shout-out-image?${qs.stringify(
            queryStringParameters
          )}`,
        },
      }
    );
    console.log(
      `https://sb-shoutout.netlify.app/.netlify/functions/shout-out-image?${qs.stringify(
        queryStringParameters
      )}`
    );
    return {
      statusCode: 302,
      headers: {
        Location: imageUrl,
      },
      body: '',
    };
  } catch (e) {
    console.log(e);
  }
};
