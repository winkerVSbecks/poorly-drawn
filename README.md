# Shout-out Generator

An image generation API to recognize Storybook Contributors.

It generates an image with a thank your message and a contour background. Each contour is unique and derived from the username.

![image demo](https://user-images.githubusercontent.com/42671/107864759-8b9f7900-6e2d-11eb-8325-b54c4111d1f7.png)

## Getting Started

```bash
$ cd image-component
$ npm i
$ npm run storybook
```

### Architecture

The whole thing is powered by an image generation API. The shout-out image is implemented as a React component. A Netlify Functions handles the requests, spins-up a headless browser with Playwright to screenshot the DOM 📸 And returns an image.

![shout-out-generator-workflow](https://user-images.githubusercontent.com/42671/107864757-88a48880-6e2d-11eb-8c1a-c5121140e03f.jpg)

It's largely based on Christopher Biscardi's wonderful [Building an OpenGraph image generation API](https://egghead.io/playlists/building-an-opengraph-image-generation-api-with-cloudinary-netlify-functions-and-react-914e) course.

### Deployment

The contributor data comes from Orbit. Therefore, you need to configure `WORKSPACE_ID` and `API_TOKEN` as environment variables on Netlify.

Checkout `netlify.toml` for other configurations and the `Makefile` for the build setup.
