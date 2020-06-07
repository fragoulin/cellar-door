import { RootState } from 'redux/store'
import { dialog, BrowserWindow } from 'electron'
import { writeFile, readFile } from 'fs'
import {
  getStateBeforeStoringToStorage,
  getStateAfterGettingFromStorage,
} from 'storage/cellar-transformers'
import { i18n as I18n } from 'i18next'

// This service can only be used in main process

const win = BrowserWindow.getAllWindows()[0]

/**
 * Open dialog to export specified state to json.
 *
 * @param state - redux state to export.
 */
function exportJSON(state: RootState, i18n: I18n): Promise<void> {
  return new Promise((resolve, reject) => {
    dialog
      .showSaveDialog(win, {
        title: i18n.t('export.title'),
        message: i18n.t('export.message'),
        buttonLabel: i18n.t('export.button'),
        defaultPath: 'cellar.json',
        properties: ['createDirectory', 'showOverwriteConfirmation'],
      })
      .then((result) => {
        if (!result.canceled && result.filePath) {
          const alteredState = getStateBeforeStoringToStorage(state)
          const json = JSON.stringify(alteredState)
          writeFile(result.filePath, json, (err) => {
            if (err) reject(err)
            else resolve()
          })
        }
      })
      .catch(reject)
  })
}

/**
 * Open dialog to load state from JSON.
 */
function importJSON(i18n: I18n): Promise<RootState> {
  return new Promise((resolve, reject) => {
    dialog
      .showOpenDialog(win, {
        title: i18n.t('import.title'),
        message: i18n.t('import.message'),
        buttonLabel: i18n.t('import.button'),
        defaultPath: 'cellar.json',
        properties: ['openFile'],
      })
      .then((result) => {
        if (!result.canceled && result.filePaths) {
          const filePath = result.filePaths[0]
          readFile(filePath, 'utf-8', (err, json) => {
            if (err) reject(err)
            else resolve(getStateAfterGettingFromStorage(JSON.parse(json)))
          })
        }
      })
  })
}

export { exportJSON, importJSON }
