import { Options } from 'electron-context-menu'
import {
  BrowserWindow,
  dialog,
  MenuItemConstructorOptions,
  MessageBoxOptions,
} from 'electron'
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
        label: i18n.t('emulatorsList.removeEmulator.label'),
        visible: params.linkURL.match(/\/emulator\/[a-z]+$/) !== null,
        click: (): void => {
          const match = params.linkURL.match(/\/emulator\/([a-z]+)$/)
          if (match) {
            const emulatorId = match[1]

            // Confirmation dialog
            const options: MessageBoxOptions = {
              buttons: [i18n.t('common.yes'), i18n.t('common.no')],
              title: i18n.t('emulatorsList.removeEmulator.label'),
              message: i18n.t('emulatorsList.removeEmulator.confirmation', {
                name: emulatorId,
              }),
              detail: i18n.t('emulatorsList.removeEmulator.confirmationDetail'),
              type: 'question',
              defaultId: 1,
              cancelId: 1,
              noLink: true,
            }
            dialog
              .showMessageBox(options)
              .then((value) => {
                if (value.response === 0) {
                  const win = browserWindow as BrowserWindow
                  win.webContents.send(
                    MenuClickChannel,
                    RemoveEmulatorId,
                    emulatorId
                  )
                }
              })
              .catch(console.error)
          }
        },
      },
    ],
  }
}

export { contextMenuOptions }
