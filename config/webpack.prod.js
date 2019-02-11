const path = require("path");
const webpack = require("webpack");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const optimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const minifyPlugin = require("babel-minify-webpack-plugin");
const compressionPlugin = require("compression-webpack-plugin");

module.exports = {
  entry: {
    // main: ["babel-polyfill", "./main.js"]
    main: [
      "./main.js",
      "./node_modules/jquery/dist/jquery.js",
      "./node_modules/material-design-lite/dist/material.js"
    ]
  },
  mode: "production",
  output: {
    filename: "[name]-bundle.js", //main-bundle.js,
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/"
  },
  module: {
    rules: [
      //JS
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      //CSS
      // {
      //   test: /\.css$/,
      //   use: [
      //     {
      //       loader: "style-loader"
      //     },
      //     {
      //       loader: "css-loader"
      //     }
      //   ]
      // },
      //SCSS
      {
        test: /\.scss$/,
        use: [
          {
            loader: miniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              import: true
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      //HTML
      {
        test: /\.html$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].html"
            }
          },
          {
            loader: "extract-loader" //separate files
          },
          {
            loader: "html-loader",
            options: {
              attrs: ["img:src"]
            }
          }
        ]
      },
      //Images
      {
        test: /\.(jpg|gif|png)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name]-[hash:8].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new optimizeCssAssetsPlugin(),
    new miniCssExtractPlugin({
      filename: "[name]-[contenthash].css"
    }),
    new minifyPlugin(),
    // new compressionPlugin({
    //   algorithm: "gzip"
    // })
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
};
