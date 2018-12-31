const Dotenv = require('dotenv-webpack');
const BabiliPlugin = require("babili-webpack-plugin");
const webpack = require('webpack');
const path = require('path');
const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');

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
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              disable: true,
              mozjpeg: {
                progressive: true,
                quality: 65
              },
            },
          },
        ],
      },
      // {
      //   // For all .css files except from node_modules
      //   test: /\.css$/,
      //   exclude: /node_modules/,
      //   use: [
      //     'style-loader',
      //     { loader: 'css-loader', options: { modules: true } }
      //   ]
      // }, {
      //   // For all .css files in node_modules
      //   test: /\.css$/,
      //   include: /node_modules/,
      //   use: ['style-loader', 'css-loader']
      // }
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
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      },
      output: {
        comments: false
      },
      sourceMap: false
    }),
    new BabiliPlugin()
  ],
  node: {
    fs: 'empty'
  }
};
