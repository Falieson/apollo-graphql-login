'use strict';

const path = require('path');
const webpack = require('webpack');

const sharedConfig = require('./webpack.shared')

module.exports = Object.assign({}, sharedConfig, {
  devtool: 'inline-source-map',
  output: {
    filename: 'index.js',
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
})
