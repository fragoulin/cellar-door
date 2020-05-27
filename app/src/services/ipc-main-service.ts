import { ipcMain, dialog, BrowserWindow } from 'electron'
import 'reflect-metadata'
import { injectable } from 'inversify'

/**
 * Cellar implementation for IPC main service.
 */
@injectable()
export class IpcMainService implements IpcMainService {
  /**
   * Register IPC listeners for main process.
   */
  public registerListeners(): void {
    // Open dialog sync request
    ipcMain.on(
      'dialogSync',
      async (
        _event,
        inputId: string,
        properties: Electron.OpenDialogSyncOptions
      ) => {
        const files = dialog.showOpenDialogSync(properties)

        // Retrieve main window and send result
        const win = BrowserWindow.getFocusedWindow()
        if (!win) return
        win.webContents.send('dialogSyncResult', inputId, files)
      }
    )
  }
}
