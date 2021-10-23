const sveltePreprocess = require('svelte-preprocess');

module.exports = {
  preprocess: sveltePreprocess({
    postcss: {
      plugins: [require('precss'), require('postcss-color-mod-function'), require('postcss-import')],
    },
  }),
}