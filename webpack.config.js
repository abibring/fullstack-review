const path = require('path');
const Dotenv = require('dotenv-webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');
const webpack = require('webpack');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.(pdf|jpg|png|gif|svg|ico)$/,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new Dotenv({
      path: './.env',
      safe: true,
      systemvars: true,
      silent: true
    }),
    new webpack.LoaderOptionsPlugin({
      minimizer: [new UglifyJsPlugin()]
    }),
  ],
  node: {
    fs: 'empty'
  }
};
