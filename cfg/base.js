'use strict';
let path = require('path');
let defaultSettings = require('./defaults');

// Additional npm or bower modules to include in builds
// Add all foreign plugins you may need into this array
// @example:
// let npmBase = path.join(__dirname, '../node_modules');
// let additionalPaths = [ path.join(npmBase, 'react-bootstrap') ];
let additionalPaths = [];

module.exports = {
  additionalPaths: additionalPaths,
  port: defaultSettings.port,
  debug: true, // 开启 loders 的debug模式
  devtool: 'eval',
  // devtool: 'sourcemap' 在 output 对应文件时，生成其 sourcemap
  output:{
    // __dirname 当前执行脚本所在目录 node.Js
    path: path.join(__dirname, '/../dist/assets'),
    filename: 'app.js',
    publicPath: `.${defaultSettings.publicPath}`
  },

  devServer: {
    contentBase: './src/', // 起的 sever 的根路径映射到的文件夹
    historyApiFallback: true,
    hot: true, // 同时在entry 引入 webpack/hot/only-dev-server
    port: defaultSettings.port,
    publicPath: defaultSettings.publicPath,
    noInfo: false
  },
  // resolve 是模块解析配置项

  // alias 指定简写

  //  extensions 自动寻找加的后缀名 ,require / entry 等 都会, 比如 entry: [ 'webpack/hot/only-dev-server' ]  它会自动寻找 webpack/hot/only-dev-server.js / webpack/hot/only-dev-server.jsx / webpack/hot/only-dev-server 文件
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      actions: `${defaultSettings.srcPath}/actions/`,
      components: `${defaultSettings.srcPath}/components/`,
      sources: `${defaultSettings.srcPath}/sources/`,
      stores: `${defaultSettings.srcPath}/stores/`,
      styles: `${defaultSettings.srcPath}/styles/`,
      config: `${defaultSettings.srcPath}/config/` + process.env.REACT_WEBPACK_ENV
    }
  },
  postcss: function () {
    return [
      require('autoprefixer')({
        browsers: ['last 2 versions', 'ie >= 8']
      })
    ];
  },
  module: {}
};
