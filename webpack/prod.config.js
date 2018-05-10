const path = require('path');
const webpack = require('webpack');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const isomorphicConfig = require('./webpack-isomorphic-tools');
const generateScopedName = require('./lib/generateScopedName');

const uglify = new webpack.optimize.UglifyJsPlugin();
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(isomorphicConfig);
const definePlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: '"production"',
    API_HOST: JSON.stringify(process.env.API_HOST || 'http://localhost:3000/'),
  },
});
const providePlugin = new webpack.ProvidePlugin({
  Promise: 'es6-promise-promise',
});
const extractCSS = new ExtractTextPlugin('css/[name].min.css');

module.exports = {
  context: path.resolve(__dirname, '..'),
  entry: {
    bundle: './src/js/index.js',
  },
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: 'js/[name].min.js',
    publicPath: '/',
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        loaders: 'babel-loader',
        exclude: /node_modules/,
        options: {
          plugins: [
            [
              'react-css-modules',
              {
                filetypes: {
                  '.scss': {
                    syntax: 'postcss-scss',
                  },
                },
                generateScopedName,
              },
            ],
          ],
        },
      },
      {
        test: /\.scss$/,
        use: extractCSS.extract([
          {
            loader: 'css-loader',
            options: {
              publicPath: 'images/',
              modules: true,
              getLocalIdent: (context, localIdentName, localName) =>
                generateScopedName(localName, context.resourcePath),
            },
          },
          {
            loader: 'sass-loader?!css-loader',
            options: {
              outputStyle: 'compressed',
              data: '@import "variables";',
              includePaths: [
                path.resolve(__dirname, '../src/scss'),
              ],
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer,
              ],
            },
          },
        ]),
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loaders: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /.*\.(png|jpe?g|svg)$/i,
        loaders: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
              mozjpeg: {
                quality: 60,
              },
            },
          },
        ],
      },
      {
        test: /\.gql$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
    ],
  },
  plugins: [
    extractCSS,
    definePlugin,
    uglify,
    webpackIsomorphicToolsPlugin,
    providePlugin,
  ],
};
