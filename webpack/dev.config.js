const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const fnGenerateScopedName = require('./lib/generateScopedName');

const extractCSS = new ExtractTextPlugin('css/[name].min.css');
const definePlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: '"development"',
    API_HOST: JSON.stringify(process.env.API_HOST || 'http://localhost:3000/'),
  },
});
const providePlugin = new webpack.ProvidePlugin({
  Promise: 'es6-promise-promise',
});
const generateScopedName = process.env.CSS_MODULES === 'true' ? fnGenerateScopedName : localName => localName;

module.exports = [{
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
              outputStyle: 'expanded',
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
              bypassOnDebug: true,
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
  devServer: {
    inline: true,
    contentBase: './public',
    historyApiFallback: {
      index: 'index.html',
    },
    watchOptions: {
      poll: true,
    },
    port: process.env.PORT || 4000,
    disableHostCheck: true,
  },
  plugins: [
    extractCSS,
    definePlugin,
    providePlugin,
  ],
}];
