const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const svelte = require('./svelte.config');

/** @type {import('webpack').Configuration} */
module.exports = (_ /* env */, argv) => ({
  mode: argv.mode,
  entry: './src/index.js',
  output: {
    filename: argv.mode === 'production' ? '[name]-[chunkhash].js' : '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: argv.mode === 'production' ? false : 'source-map',
  resolve: {
    alias: {
      svelte: path.resolve('node_modules', 'svelte'),
    },
    extensions: ['.mjs', '.js', '.svelte', '.ts'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
    fallback: {
      fs: false,
      path: require.resolve("path-browserify"),
    }
  },
  module: {
    rules: [
      {
        test: /\.(html|svelte|svg)$/,
        use: {
          loader: 'svelte-loader',
          options: {
            ...svelte,
            emitCss: argv.mode === 'production',
            hotReload: argv.mode !== 'production',
            compilerOptions: {
              dev: argv.mode !== 'production',
            },
            hotOptions: {
              preserveLocalState: true,
            }
          }
        },
      },
      {
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false,
        },
      },
      argv.mode === 'production' && {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false, // necessary if you use url('/path/to/some/asset.png|jpg|gif')
              sourceMap: argv.mode !== 'production',
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
      {
        test: /public/,
        type: 'asset/resource',
        generator: {
          filename: '[name][ext]',
        }
      },
    ].filter(Boolean),
  },
  devServer: {
    static: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
     title: 'r/HFY epub',
    }),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require("./package.json").version),
      DEV: JSON.stringify(argv.mode !== 'production'),
    }),
    argv.mode === 'production' && new MiniCssExtractPlugin({ filename: argv.mode === 'production' ? '[name]-[chunkhash].css' : '[name].css' }),
  ].filter(Boolean),
});