const tsImportPluginFactory = require('ts-import-plugin')

module.exports = [
  // Add support for native node modules
  {
    test: /\.node$/,
    use: 'node-loader',
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@marshallofsound/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: 'ts-loader',
      options: {
        transpileOnly: true
      }
    }
  },
  {
    test: /\.(jsx|tsx|js|ts)$/,
    loader: 'ts-loader',
    options: {
      transpileOnly: true,
      getCustomTransformers: () => ({
        before: [ tsImportPluginFactory({
          libraryName: 'antd',
          libraryDirectory: 'lib',
          style: 'css'
        }) ]
      }),
      compilerOptions: {
        module: 'es2015'
      }
    },
    exclude: /node_modules/
  }
];
