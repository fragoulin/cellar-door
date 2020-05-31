import { ipcMain, dialog, app } from 'electron'

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
    // If the app is not packaged (dev mode), the resources path references electron installation in node_modules directory.
    event.returnValue = app.isPackaged ? process.resourcesPath : 'resources'
  })

  // Check for dev mode
  ipcMain.on('isDev', async (event) => {
    event.returnValue = !app.isPackaged
  })
}

export { registerListeners }
