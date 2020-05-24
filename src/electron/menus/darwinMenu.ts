import { App, MenuItemConstructorOptions, MenuItem } from 'electron'

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
        label: 'Locale',
        submenu: [{ label: 'English' }, { label: 'French' }],
      },
    ],
  },
  {
    label: 'Help',
    submenu: [{ label: 'About' }],
  },
]
