import { ipcMain, dialog, app } from 'electron'
import 'reflect-metadata'
import { injectable } from 'inversify'

/**
 * Cellar implementation for IPC main service.
 *
 * Cannot be used in renderer process.
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
        event,
        inputId: string,
        properties: Electron.OpenDialogSyncOptions
      ) => {
        const files = dialog.showOpenDialogSync(properties)
        event.reply('dialogSyncResult', inputId, files)
      }
    )

    // Get app root
    ipcMain.on('getResourcesPath', async (event) => {
      event.returnValue = app.isPackaged ? process.resourcesPath : 'resources'
    })
  }
}
