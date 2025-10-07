const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
    devServer: {
    watchFiles: ["./src/template.html"],
  },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html",
        }),
        new webpack.DefinePlugin({
            "process.env": {
                VC_API_KEY: JSON.stringify(process.env.VC_API_KEY),
                GM_API_KEY: JSON.stringify(process.env.GM_API_KEY),
            },
        }),
    ],
    module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
