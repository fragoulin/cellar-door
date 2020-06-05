import { Options } from 'electron-context-menu'
import { BrowserWindow, MenuItemConstructorOptions } from 'electron'
import { i18n as I18n } from 'i18next'
import { MenuClickChannel, RemoveEmulatorId } from '../constants'

/**
 * Build context menu options.
 */
const contextMenuOptions = (i18n: I18n): Options => {
  return {
    menu: (
      _defaultActions,
      params,
      browserWindow
    ): MenuItemConstructorOptions[] => [
      {
        label: i18n.t('emulatorsList.removeEmulator'),
        visible: params.linkURL.match(/\/emulator\/[a-z]+$/) !== null,
        click: (): void => {
          const match = params.linkURL.match(/\/emulator\/([a-z]+)$/)
          if (match) {
            const emulatorId = match[1]
            const win = browserWindow as BrowserWindow
            win.webContents.send(MenuClickChannel, RemoveEmulatorId, emulatorId)
          }
        },
      },
    ],
  }
}

export { contextMenuOptions }
