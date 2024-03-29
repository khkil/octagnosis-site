const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const PROJECT_ROOT = path.resolve(__dirname);
const SRC_PATH = path.resolve(__dirname, "src");
const BUILD_PATH = path.resolve(PROJECT_ROOT, "build");
const PUBLIC_INDEX = path.resolve(PROJECT_ROOT, "public", "index.html");

module.exports = (webpackEnv) => {
  const isDevelopment = process.env.NODE_ENV !== "production";
  return {
    mode: isDevelopment ? "development" : "production",
    entry: path.resolve(SRC_PATH, "index.js"),
    output: {
      publicPath: "/",
      path: path.resolve(__dirname, "dist"), // 경로
      filename: "app.bundle.js", // 하나로 묶일 javascrpit 파일
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: "babel-loader",
          options: { presets: ["@babel/env", "@babel/preset-react"] },
        },
        {
          test: /\.css/,
          exclude: /node_modules/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: "file-loader",
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: "file-loader",
        },
      ],
    },
    resolve: {
      extensions: [".jsx", ".js", ".json"],
    },
    plugins: [
      isDevelopment && new ReactRefreshWebpackPlugin(),
      new HtmlWebpackPlugin({ template: PUBLIC_INDEX }),
      /* new FaviconsWebpackPlugin({
        logo: "public/favicon.png",
      }), */
      new Dotenv(),
      new CleanWebpackPlugin(),

      new MiniCssExtractPlugin(),
    ],
    cache: {
      type: isDevelopment ? "memory" : "filesystem",
    },

    devServer: {
      port: 3001,
      disableHostCheck: true,
      host: "localhost",
      open: true,
      overlay: true,
      hot: true,
      stats: "errors-warnings",
      historyApiFallback: true,
      proxy: {
        "/api": "http://localhost:8088",
      },
    },
  };
};
