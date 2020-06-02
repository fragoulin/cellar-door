import {
  App,
  MenuItemConstructorOptions,
  MenuItem,
  BrowserWindow,
} from 'electron'
import * as i18nBackend from 'i18next-electron-fs-backend'
import Whitelist from '../src/localization/whitelist'
import { i18n as I18n } from 'i18next'
import { MenuClickChannel, NewCellarId } from './constants'

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
 * Handle menu click.
 *
 * @param menuItem - menu item user clicked on.
 * @param browserWindow - current browser window.
 */
function handleClick(menuItem: MenuItem, browserWindow: BrowserWindow): void {
  browserWindow.webContents.send(MenuClickChannel, menuItem.id)
}

/**
 * Main menu (like file) for all OS.
 *
 * @returns cellar menu for all OS.
 */
function cellarMenuFragment(i18n: I18n): MenuItemConstructorOptions {
  return {
    label: i18n.t('menu.cellar.label'),
    submenu: [
      {
        id: NewCellarId,
        label: i18n.t('menu.cellar.newCellar'),
        click: handleClick,
      },
      { label: i18n.t('menu.cellar.newEmulator'), click: handleClick },
      { type: 'separator' },
      { label: i18n.t('menu.cellar.open'), click: handleClick },
      { label: i18n.t('menu.cellar.openRecent'), click: handleClick },
      { type: 'separator' },
      { label: i18n.t('menu.cellar.save'), click: handleClick },
      { label: i18n.t('menu.cellar.saveAs'), click: handleClick },
      { type: 'separator' },
      { label: i18n.t('menu.cellar.closeEmulator'), click: handleClick },
      { type: 'separator' },
      ...(isMac
        ? [
            {
              role: 'close',
              label: i18n.t('menu.cellar.close'),
              click: handleClick,
            } as MenuItemConstructorOptions,
          ]
        : [
            {
              role: 'quit',
              label: i18n.t('menu.cellar.quit'),
              click: handleClick,
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
function preferencesMenuFragment(i18n: I18n): MenuItemConstructorOptions {
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
function helpMenuFragment(i18n: I18n): MenuItemConstructorOptions {
  return {
    role: 'help',
    label: i18n.t('menu.help.label'),
    submenu: [
      { role: 'about', label: i18n.t('menu.help.about'), click: handleClick },
    ],
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
