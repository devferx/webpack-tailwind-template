const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";

/** @type {import("webpack").Configuration} */
module.exports = {
  entry: path.resolve(__dirname, "src/index.js"),
  mode: process.env.ENV,
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve("./dist"),
    publicPath: "/",
    assetModuleFilename: "assets/[hash][ext][query]",
  },
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },
  devServer: {
    port: 5050,
    compress: true,
    contentBase: path.join(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.css$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
    }),
    isProd
      ? new MiniCssExtractPlugin({
          filename: "styles.[contenthash].css",
        })
      : () => {},
    isProd ? new CleanWebpackPlugin() : () => {},
  ],
};
