const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/public/index.html",
  filename: "./public/index.html"
});

const config = {
  target: "electron-renderer",
  entry: "./src/app/renderer.tsx",
  output: {
    filename: "renderer.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  plugins: [htmlPlugin]
};

module.exports = (env, argv) => {
  return config;
};
