'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack           = require('webpack');

const PRODUCTION = process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'production';

module.exports = {
  entry: './app/index.jsx',
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
    historyApiFallback: true,
    host: '0.0.0.0'
  },
  mode: PRODUCTION ? 'production' : 'development',
  module: {
    rules: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './app/index.html', filename: 'index.html', inject: 'body' }),
    new Webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) || 'undefined' }),
    new Webpack.ProvidePlugin({ React: 'react' })
  ]
};
