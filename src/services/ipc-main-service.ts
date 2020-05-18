import { ipcMain, dialog, BrowserWindow } from 'electron'
import { RootState } from '../redux/store'
import { saveState, loadState } from './database-service'

// Open dialog sync request
ipcMain.on('dialogSync', async (_event, inputId: string, properties: Electron.OpenDialogSyncOptions) => {
  const files = dialog.showOpenDialogSync(properties)

  // Retrieve main window and send result
  const win = BrowserWindow.getFocusedWindow()
  if (win) {
    win.webContents.send('dialogSyncResult', inputId, files)
  }
})

// Save redux state
ipcMain.on('saveState', async (_event, state: RootState) => {
  saveState(state, (err, numReplaced, upsert) => {
    // Retrieve main window and send result
    const win = BrowserWindow.getFocusedWindow()
    if (win) {
      win.webContents.send('stateSaved', err, numReplaced, upsert)
    }
  })
})

// Load redux state
ipcMain.on('loadState', async () => {
  loadState((err, state) => {
    // Retrieve main window and send result
    const win = BrowserWindow.getFocusedWindow()
    if (win) {
      win.webContents.send('stateLoaded', err, state)
    }
  })
})
