const devCerts = require("office-addin-dev-certs");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");
const webpack = require("webpack");

const urlDev = "https://localhost:3000/";
const urlProd = "https://www.bibleget.io/"; // CHANGE THIS TO YOUR PRODUCTION DEPLOYMENT LOCATION

module.exports = async (env, options) => {
  const dev = options.mode === "development";
  const buildType = dev ? "dev" : "prod";
  const config = {
    devtool: "source-map",
    entry: {
      polyfill: "@babel/polyfill",
      taskpane: "./src/taskpane/taskpane.js",
      commands: "./src/commands/commands.js",
      sresults: "./src/taskpane/search-results.js",
      settings: "./src/taskpane/settings.js",
      help: "./src/taskpane/help.js",
      about: "./src/taskpane/about.js",
      i18n: "./src/taskpane/i18n.js"
    },
    resolve: {
      extensions: [".ts", ".tsx", ".html", ".js"]
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          }
        },
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: "html-loader"
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/,
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]"
          }
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: "taskpane.html",
        template: "./src/taskpane/taskpane.html",
        chunks: ["polyfill", "taskpane", "i18n"]
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            to: "taskpane.css",
            from: "./src/taskpane/taskpane.css"
          },
          {
            to: "[name]." + buildType + ".[ext]",
            from: "manifest*.xml",
            transform(content) {
              if (dev) {
                return content;
              } else {
                return content.toString().replace(new RegExp(urlDev, "g"), urlProd);
              }
            }
          }
        ]
      }),
      new HtmlWebpackPlugin({
        filename: "settings.html",
        template: "./src/taskpane/settings.html",
        chunks: ["polyfill", "settings", "i18n"]
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            to: "settings.css",
            from: "./src/taskpane/settings.css"
          }
        ]
      }),
      new HtmlWebpackPlugin({
        filename: "search-results.html",
        template: "./src/taskpane/search-results.html",
        chunks: ["polyfill", "sresults", "i18n"]
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            to: "search-results.css",
            from: "./src/taskpane/search-results.css"
          },
          {
            to: "[name]." + buildType + ".[ext]",
            from: "manifest.xml",
            transform(content) {
              if (dev) {
                return content;
              } else {
                return content.toString().replace(new RegExp(urlDev, "g"), urlProd);
              }
            }
          }
        ]
      }),
      new HtmlWebpackPlugin({
        filename: "help.html",
        template: "./src/taskpane/help.html",
        chunks: ["polyfill", "help", "i18n"]
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            to: "help.css",
            from: "./src/taskpane/help.css"
          }
        ]
      }),
      new HtmlWebpackPlugin({
        filename: "about.html",
        template: "./src/taskpane/about.html",
        chunks: ["polyfill", "about", "i18n"]
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            to: "about.css",
            from: "./src/taskpane/about.css"
          }
        ]
      }),
      new HtmlWebpackPlugin({
        filename: "commands.html",
        template: "./src/commands/commands.html",
        chunks: ["polyfill", "commands"]
      })
    ],
    devServer: {
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      https: options.https !== undefined ? options.https : await devCerts.getHttpsServerOptions(),
      port: process.env.npm_package_config_dev_server_port || 3000
    }
  };

  return config;
};
