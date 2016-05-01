'use strict';

const Webpack = require('webpack');

const PRODUCTION = process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'production';

const PLUGINS = [new Webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development') })];

if (PRODUCTION) {
  PLUGINS.push(new Webpack.optimize.DedupePlugin());
  PLUGINS.push(new Webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }, mangle: false }));
}

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
  devtool: PRODUCTION ? undefined : 'inline-source-map',
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
  },
  plugins: PLUGINS
};
