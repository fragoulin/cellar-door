import { App, MenuItemConstructorOptions, MenuItem } from 'electron'
import * as i18nBackend from 'i18next-electron-fs-backend'
import Whitelist from '../../i18n/whitelist'

export default (app: App): Array<MenuItemConstructorOptions | MenuItem> => [
  {
    label: 'Cellar',
    submenu: [
      { label: 'New cellar' },
      { label: 'New emulator' },
      { type: 'separator' },
      { label: 'Open' },
      { label: 'Open recent' },
      { type: 'separator' },
      { label: 'Save' },
      { label: 'Save As' },
      { type: 'separator' },
      { label: 'Close' },
      { type: 'separator' },
      {
        label: 'Exit',
        click(): void {
          app.quit()
        },
      },
    ],
  },
  {
    label: 'Preferences',
    submenu: [
      {
        label: 'Language',
        submenu: Whitelist.buildSubmenu(i18nBackend.changeLanguageRequest),
      },
    ],
  },
  {
    label: 'Help',
    submenu: [{ label: 'About' }],
  },
]
