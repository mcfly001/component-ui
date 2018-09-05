'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const isSingle = process.env.NODE_ENV === "single"

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: utils.styleLoaders({
      sourceMap: false,
      extract: true,
      usePostCSS: true,
      isminimize: true
    })
  },
  devtool: '#source-map',
  plugins: [
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css\.*(?!.*map)/g,
      cssProcessorOptions: {
        autoprefixer: true
      },
      canPrint: true
    }),
    new MiniCssExtractPlugin({
      filename: isSingle ? 'style.css?[contenthash:8]' : '[name]/style.css?[contenthash:8]'
    }),
    new VueLoaderPlugin()
  ]
})

module.exports = webpackConfig
