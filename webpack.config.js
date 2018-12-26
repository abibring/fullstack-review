const path = require('path');
const Dotenv = require('dotenv-webpack');
const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const __PROD__ = process.env.NODE_ENV === 'production'

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
      },
      {
        test: /\.css$/,
        include: [
          `${SRC_DIR}/../dist`,
          /node_modules/
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: true,
                minimize: __PROD__
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new Dotenv({
      path: './.env',
      safe: false,
      systemvars: true,
      silent: false
    }),
    ExtractTextPlugin('style.css')
  ],
  node: {
    fs: 'empty'
  }
};
