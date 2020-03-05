'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const Path              = require('path');
const Webpack           = require('webpack');

const PRODUCTION = process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'production';

const PLUGINS = [
  new Webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) || 'undefined' }),
  new Webpack.ProvidePlugin({ React: 'react' }),
  new HtmlWebpackPlugin({ template: './index.html', filename: 'index.html', inject: 'body' })
];

if (PRODUCTION) {
  PLUGINS.push(new Webpack.optimize.UglifyJsPlugin({ sourceMap: true }));
}

module.exports = {
  context: Path.join(__dirname, 'app'),
  entry: './index.jsx',
  output: {
    path: `${__dirname}/public`,
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.jsx', '.js']
  },
  devtool: PRODUCTION ? 'source-map' : 'inline-source-map',
  devServer: {
    contentBase: 'public/',
    historyApiFallback: true
  },
  mode: PRODUCTION ? 'production' : 'development',
  module: {
    rules: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
    ]
  },
  plugins: PLUGINS
};
