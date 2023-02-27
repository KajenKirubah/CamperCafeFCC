const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const currentTask = process.env.npm_lifecycle_event;

console.log("current task is " + currentTask);


const postCSSPlugins = [require('postcss-mixins'), require('autoprefixer'), require("postcss-nested")]

module.exports = {
  entry: {
    app: "./app/scripts/App.js",
  },
  mode: "development",
  output: {
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "docs"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Camper Cafe",
      filename: "index.html",
      template: "./app/index.html",
    }),
    new MiniCssExtractPlugin({ filename: "styles.[chunkhash].css" }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          currentTask == "dev" ? "style-loader" : MiniCssExtractPlugin.loader, 
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: postCSSPlugins
              }
            }
          }
        ],
      },
    ],
  },
  devServer: {
    watchFiles: ["app/**/*.html"],
    static: {
      directory: path.resolve(__dirname, "docs"),
    },
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 1000,
    },
  },
};

let pathname = path.resolve(__dirname, "docs");
console.log("the path is " + pathname);

//issue with html-webpack-plugin when used with webpack-dev-server.
//If you change the filename property, then webpack dev server doesn't
//server up the html file.
