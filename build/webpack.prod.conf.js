'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const env = process.env.NODE_ENV

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  entry: config[env].entry,
  output: {
    path: config[env].output,
    filename: 'index.js',
    library: 'vue-ui',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: utils.styleLoaders({
      extract: config[env].extract,
      sourceMap: config[env].sourceMap,
      usePostCSS: config[env].usePostCSS,
      isminimize: config[env].isminimize
    })
  },
  devtool: config[env].devtool,
  plugins: [
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css\.*(?!.*map)/g,
      cssProcessorOptions: {
        autoprefixer: config[env].autoprefixer
      },
      canPrint: true
    }),
    new MiniCssExtractPlugin({
      filename: `index.css?[contenthash:8]`
    }),
    new VueLoaderPlugin()
  ]
})

if(env === 'doc_build' || env === 'demo_build'){
  webpackConfig.plugins.push(new HtmlWebpackPlugin({
    filename: 'index.html',
    template: config[env].template,
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    },
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: 'dependency'
  }))
}

module.exports = webpackConfig
