/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {
      // https://github.com/tailwindlabs/tailwindcss/discussions/16370
      optimize: {
        minify: false
      }
    },
  },
};

export default config;
