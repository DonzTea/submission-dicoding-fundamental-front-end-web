const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    watchFiles: ['src/**/*'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  watchOptions: {
    ignored: /node_modules/,
  },
});
