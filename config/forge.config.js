const path = require('path')

module.exports = {
  packagerConfig: {
    asar: true,
    icon: path.join(__dirname, '../resources/icons/cellar-door'),
    name: 'Cellar door',
    appCategoryType: 'public.app-category.games',
    appCopyright: 'Copyright (c) 2020 Fabrice Morin',
    platform: [
      'darwin',
      'linux',
      'win32'
    ],
    extraResource: [
      path.join(__dirname, '../resources/locales')
    ]
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
        mainConfig: './config/webpack/webpack.main.config.js',
        renderer: {
          config: './config/webpack/webpack.renderer.config.js',
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
