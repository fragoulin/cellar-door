import { ipcMain, dialog, app } from 'electron'
import { getResourcesPath } from 'services/app-service'
import {
  DialogSelectDirectoryChannel,
  getResourcesPathChannel,
  DialogSyncResultChannel,
  isDevChannel,
  DialogExportCellarChannel,
  DialogImportCellarChannel,
  DialogOpenResultChannel,
} from 'electron/constants'
import { RootState } from 'redux/store'
import { exportJSON, importJSON } from './import-export-service'
import { i18n as I18n } from 'i18next'

/**
 * Registers listeners for IPC on main process.
 */
function registerListeners(): void {
  ipcMain
    .on(
      // Open dialog to select directory
      DialogSelectDirectoryChannel,
      async (
        event,
        inputId: string,
        properties: Electron.OpenDialogSyncOptions
      ) => {
        dialog
          .showOpenDialog(properties)
          .then((result) => {
            if (!result.canceled) {
              event.reply(DialogSyncResultChannel, inputId, result.filePaths)
            }
          })
          .catch(console.error)
      }
    )
    .on(getResourcesPathChannel, async (event) => {
      // Get resources path
      event.returnValue = getResourcesPath()
    })
    .on(isDevChannel, async (event) => {
      // Check for dev mode
      event.returnValue = !app.isPackaged
    })
}

/**
 * Register listeners which need i18n.
 *
 * @param i18n - i18n instance for translations.
 */
function registerListenersWithLocalization(i18n: I18n): void {
  ipcMain
    .on(
      // Save dialog to export cellar
      DialogExportCellarChannel,
      async (_event, state: RootState) => {
        exportJSON(state, i18n).catch(console.error)
      }
    )
    .on(
      // Open dialog to import cellar
      DialogImportCellarChannel,
      async (event) => {
        importJSON(i18n)
          .then((state) => {
            event.reply(DialogOpenResultChannel, state)
          })
          .catch(console.error)
      }
    )
}

export { registerListeners, registerListenersWithLocalization }
