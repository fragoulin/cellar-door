import { ipcMain, dialog, app } from 'electron'
import { getResourcesPath } from 'app/src/services/app-service'

function registerListeners(): void {
  // Open dialog sync request
  ipcMain.on(
    'dialogSync',
    async (
      event,
      inputId: string,
      properties: Electron.OpenDialogSyncOptions
    ) => {
      const files = dialog.showOpenDialogSync(properties)
      event.reply('dialogSyncResult', inputId, files)
    }
  )

  // Get resources path
  ipcMain.on('getResourcesPath', async (event) => {
    event.returnValue = getResourcesPath()
  })

  // Check for dev mode
  ipcMain.on('isDev', async (event) => {
    event.returnValue = !app.isPackaged
  })
}

export { registerListeners }
