import { ipcMain, dialog, BrowserWindow } from 'electron'
import { RootState } from '../redux/store'
import { DatabaseService } from './database-service'
import { TYPES } from './types'
import { inject, injectable } from 'inversify'

import 'reflect-metadata'

export interface IpcMainService {
  registerListeners (): void;
}

@injectable()
export class CellarIpcMainService implements IpcMainService {
  private databaseService: DatabaseService;

  public constructor (
    @inject(TYPES.DatabaseService) databaseService: DatabaseService
  ) {
    this.databaseService = databaseService
  }

  public registerListeners (): void {
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
      this.databaseService.saveState(state, (err, numReplaced, upsert) => {
        // Retrieve main window and send result
        const win = BrowserWindow.getFocusedWindow()
        if (win) {
          win.webContents.send('stateSaved', err, numReplaced, upsert)
        }
      })
    })

    // Load redux state
    ipcMain.on('loadState', async () => {
      this.databaseService.loadState((err, state) => {
        // Retrieve main window and send result
        const win = BrowserWindow.getFocusedWindow()
        if (win) {
          win.webContents.send('stateLoaded', err, state)
        }
      })
    })
  }
}
