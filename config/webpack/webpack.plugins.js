const webpack = require('webpack') 
const path = require('path')
const rootPath = require('electron-root-path').rootPath
const pkg = require(path.join(rootPath, 'package.json'))

const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

module.exports = [
  new HardSourceWebpackPlugin(),
  new webpack.DefinePlugin({
    PKG_INFO: {
      name: JSON.stringify(pkg.name),
      productName: JSON.stringify(pkg.productName),
      version: JSON.stringify(pkg.version),
      description: JSON.stringify(pkg.description),
      repository: JSON.stringify(pkg.repository),
      author: JSON.stringify(pkg.author),
      homepage: JSON.stringify(pkg.homepage),
      bugs: JSON.stringify(pkg.bugs),
      keywords: JSON.stringify(pkg.keywords),
      license: JSON.stringify(pkg.license)
    }
  }),
]
