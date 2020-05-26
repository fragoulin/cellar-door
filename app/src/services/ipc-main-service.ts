import { ipcMain, dialog, BrowserWindow } from 'electron'
import { RootState } from '../redux/store'
import { DatabaseService } from './database-service'
import { TYPES } from '../inversify/types'
import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import * as i18nConfig from '../../localization/i18next.config.main'

/**
 * IPC main service definition.
 */
export interface IpcMainService {
  /**
   * Register IPC listeners for main process.
   */
  registerListeners(): void
}

/**
 * Cellar implementation for IPC main service.
 */
@injectable()
export class CellarIpcMainService implements IpcMainService {
  private databaseService: DatabaseService

  /**
   * Build new IPC main service.
   *
   * @param databaseService - the database service to use for state persistence.
   */
  public constructor(
    @inject(TYPES.DatabaseService) databaseService: DatabaseService
  ) {
    this.databaseService = databaseService
  }

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

    // Save redux state
    ipcMain.on('saveState', async (_event, state: RootState) => {
      const win = BrowserWindow.getFocusedWindow()
      if (!win) return
      this.databaseService
        .saveState(state)
        .then(() => {
          win.webContents.send('stateSaved')
        })
        .catch((err) => {
          win.webContents.send('stateSaved', err)
        })
    })

    // Load redux state
    ipcMain.on('loadState', async () => {
      const win = BrowserWindow.getFocusedWindow()
      if (!win) return
      this.databaseService
        .loadState()
        .then((state) => {
          win.webContents.send('stateLoaded', undefined, state)
        })
        .catch((err) => {
          win.webContents.send('stateLoaded', err)
        })
    })

    // Update language
    ipcMain.on('updateLanguage', async (_event, language: string) => {
      i18nConfig
        .whenReady(language)
        .then((i18n) => {
          ipcMain.emit('languageUpdated', null, i18n)
        })
        .catch(console.error)
    })
  }
}
