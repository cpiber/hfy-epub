const sveltePreprocess = require('svelte-preprocess');

module.exports = {
  preprocess: sveltePreprocess({
    postcss: {
      plugins: [require('autoprefixer'), require('precss'), require('postcss-preset-env'), require('postcss-import')]
    }
  })
}