const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './app/electron/main.ts',
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules')
  },
  plugins: require('./webpack.plugins'),
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.scss', '.json'],
    plugins: [
      new TsConfigPathsPlugin()
    ]
  }
}
