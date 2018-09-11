'use strict'
const path = require('path')
const { getLocalIp } = require('./utils')

module.exports = {
  doc_dev: {
    host: getLocalIp(), // can be overwritten by process.env.HOST
    entry: path.join(__dirname, '../doc/main.js'),
    output: path.join(__dirname, '../dist/doc/demo'),
    template: path.join(__dirname, '../doc/index.html'),
    port: 3000, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    assetsPublicPath: '/',
    proxyTable: {

    },
    extract: false,
    sourceMap: true,
    usePostCSS: true,
    isminimize: false,
    poll: false,
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    cssSourceMap: true,
    devtool: 'cheap-module-eval-source-map',
    assetsSubDirectory: 'static',
  },
  doc_build: {
    entry: path.join(__dirname, '../doc/main.js'),
    // path
    output: path.resolve(__dirname, '../doc/dist/doc'),
    template: path.join(__dirname, '../doc/index.html'),
    assetsPublicPath: '/',
    extract: true,
    sourceMap: true,
    usePostCSS: true,
    isminimize: true,
    productionSourceMap: false,
    devtool: '#source-map',
    autoprefixer: true
  },
  all_build: {
    entry: path.join(__dirname, '../src/index.js'),
    template: '',
    // path
    output: path.resolve(__dirname, '../publish/component-ui/dist'),
    assetsPublicPath: '/',
    productionSourceMap: false,
    extract: true,
    sourceMap: true,
    usePostCSS: true,
    isminimize: true,
    devtool: '#source-map'
  },
  single: {

  }
}
