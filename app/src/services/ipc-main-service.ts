import { ipcMain, dialog, app } from 'electron'
import { getResourcesPath } from 'services/app-service'
import {
  DialogSyncChannel,
  getResourcesPathChannel,
  DialogSyncResultChannel,
  isDevChannel,
} from 'electron/constants'

function registerListeners(): void {
  // Open dialog sync request
  ipcMain.on(
    DialogSyncChannel,
    async (
      event,
      inputId: string,
      properties: Electron.OpenDialogSyncOptions
    ) => {
      const files = dialog.showOpenDialogSync(properties)
      event.reply(DialogSyncResultChannel, inputId, files)
    }
  )

  // Get resources path
  ipcMain.on(getResourcesPathChannel, async (event) => {
    event.returnValue = getResourcesPath()
  })

  // Check for dev mode
  ipcMain.on(isDevChannel, async (event) => {
    event.returnValue = !app.isPackaged
  })
}

export { registerListeners }
