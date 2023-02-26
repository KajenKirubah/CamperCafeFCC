const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: "./app/scripts/App.js",
  },
  mode: 'development',
  output: {
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "docs"),
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Camper Cafe",
      filename: "index.html",
      template: './app/index.html'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    watchFiles: ["app/**/*.html"],
    static: {
        directory: path.resolve(__dirname, 'docs')
    }
  }
};

let pathname = path.resolve(__dirname, 'docs');
console.log("the path is " + pathname);

//issue with html-webpack-plugin when used with webpack-dev-server.  
//If you change the filename property, then webpack dev server doesn't
//server up the html file.
