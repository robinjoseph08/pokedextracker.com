'use strict';

var Webpack = require('webpack');

module.exports = {
  context: __dirname + '/app',
  entry: './boot.ts',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: 'public/',
    historyApiFallback: true
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts' },
      { test: /\.scss$/, loaders: ['style', 'css', 'sass'] },
      { test: /\.html/, loader: 'raw' }
    ],
    postLoaders: [{
      test: /\.(js|ts)$/,
      exclude: /(test|node_modules)\//,
      loader: 'istanbul-instrumenter'
    }]
  }
};
