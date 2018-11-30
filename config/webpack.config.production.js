const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const configuration = require('./webpack.config');

module.exports = Object.assign({}, configuration, {
  plugins: [
    new CopyWebpackPlugin([{ from: 'client/dist' }]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new ExtractTextPlugin({
      allChunks: true,
      filename: '[name].[hash].css',
    }),
    new HtmlWebpackPlugin({ template: './client/dist/index.html' }),
  ],
});
