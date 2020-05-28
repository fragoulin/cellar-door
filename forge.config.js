const fs = require('fs-extra')
const path = require('path')

module.exports = {
  hooks: {
    packageAfterCopy: (_config, extractPath) => {
      const resourcesPath = path.join(__dirname, 'resources')
      const destinationPath = path.join(extractPath, '..')
      fs.copy(resourcesPath, destinationPath)
        .then(() => console.log('success!'))
        .catch((err) => console.error(err))
    },
  },
  packagerConfig: {
    asar: true,
    icon: 'resources/icons/cellar-door',
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'cellar_door',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    [
      '@electron-forge/plugin-webpack',
      {
        mainConfig: './config/webpack.main.config.js',
        renderer: {
          config: './config/webpack.renderer.config.js',
          entryPoints: [
            {
              html: './app/src/index.html',
              js: './app/electron/renderer.tsx',
              name: 'main_window',
              preload: {
                js: './app/electron/preload.ts',
              },
            },
          ],
        },
      },
    ],
  ],
}
