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

/**
 * Registers listeners for IPC on main process.
 */
function registerListeners(): void {
  // Open dialog to select directory
  ipcMain
    .on(
      DialogSelectDirectoryChannel,
      async (
        event,
        inputId: string,
        properties: Electron.OpenDialogSyncOptions
      ) => {
        const files = dialog.showOpenDialogSync(properties)
        event.reply(DialogSyncResultChannel, inputId, files)
      }
    )
    .on(
      // Save dialog to export cellar
      DialogExportCellarChannel,
      async (_event, state: RootState) => {
        exportJSON(state).catch(console.error)
      }
    )
    .on(
      // Open dialog to import cellar
      DialogImportCellarChannel,
      async (event) => {
        importJSON()
          .then((state) => {
            event.reply(DialogOpenResultChannel, state)
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

export { registerListeners }
