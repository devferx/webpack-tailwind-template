require('dotenv').config();
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin  =  require('html-webpack-plugin');

const isProd = process.env.ENV === 'production';

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  mode: process.env.ENV,
  output: {
    filename: "[name].js",
    path: path.resolve('./dist'),
    publicPath: '/',
  },
  devServer: {
    port: 5050,
    contentBase: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.css$/,
        use: [ isProd ? MiniCssExtractPlugin.loader : "style-loader", "css-loader", "postcss-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html')
    }),
    isProd? new MiniCssExtractPlugin() : () => {}
  ]
}