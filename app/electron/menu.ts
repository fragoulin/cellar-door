import { App, MenuItemConstructorOptions, MenuItem } from 'electron'
import * as i18nBackend from 'i18next-electron-fs-backend'
import Whitelist from '../src/localization/whitelist'
import { i18n as I18n } from 'i18next'

const isMac = process.platform === 'darwin'

/**
 * The system menu fragment for mac OS.
 *
 * @param appName - application name
 * @returns system menu fragment for mac OS.
 */
const macSystemMenuFragment = (
  appName: string,
  i18n: I18n
): Array<MenuItemConstructorOptions | MenuItem> => [
  {
    label: appName,
    submenu: [
      { role: 'about', label: i18n.t('menu.system.about') },
      { type: 'separator' },
      { role: 'services', label: i18n.t('menu.system.services') },
      { type: 'separator' },
      { role: 'hide', label: i18n.t('menu.system.hide') },
      { role: 'hideOthers' },
      { role: 'unhide', label: i18n.t('menu.system.unhide') },
      { type: 'separator' },
      { role: 'quit', label: i18n.t('menu.system.quit') },
    ],
  },
]

/**
 * Main menu (like file) for all OS.
 *
 * @returns cellar menu for all OS.
 */
const cellarMenuFragment = (i18n: I18n): MenuItemConstructorOptions => {
  return {
    label: i18n.t('menu.cellar.label'),
    submenu: [
      { label: i18n.t('menu.cellar.newCellar') },
      { label: i18n.t('menu.cellar.newEmulator') },
      { type: 'separator' },
      { label: i18n.t('menu.cellar.open') },
      { label: i18n.t('menu.cellar.openRecent') },
      { type: 'separator' },
      { label: i18n.t('menu.cellar.save') },
      { label: i18n.t('menu.cellar.saveAs') },
      { type: 'separator' },
      { label: i18n.t('menu.cellar.closeEmulator') },
      { type: 'separator' },
      ...(isMac
        ? [
            {
              role: 'close',
              label: i18n.t('menu.cellar.close'),
            } as MenuItemConstructorOptions,
          ]
        : [
            {
              role: 'quit',
              label: i18n.t('menu.cellar.quit'),
            } as MenuItemConstructorOptions,
          ]),
    ],
  }
}

/**
 * Preferences menu for all OS.
 *
 * @returns preferences menu for all OS.
 */
const preferencesMenuFragment = (i18n: I18n): MenuItemConstructorOptions => {
  return {
    label: i18n.t('menu.preferences.label'),
    submenu: [
      {
        label: i18n.t('menu.preferences.language'),
        submenu: Whitelist.buildSubmenu(
          i18nBackend.changeLanguageRequest,
          i18n
        ),
      },
    ],
  }
}

/**
 * Help menu fragment for all OS.
 *
 * @returns help menu for all OS.
 */
const helpMenuFragment = (i18n: I18n): MenuItemConstructorOptions => {
  return {
    role: 'help',
    label: i18n.t('menu.help.label'),
    submenu: [{ role: 'about', label: i18n.t('menu.help.about') }],
  }
}

/**
 * Build menu for all OS.
 */
export default (
  app: App,
  i18n: I18n
): Array<MenuItemConstructorOptions | MenuItem> => [
  ...(isMac ? macSystemMenuFragment(app.name, i18n) : []),
  cellarMenuFragment(i18n),
  preferencesMenuFragment(i18n),
  helpMenuFragment(i18n),
]
