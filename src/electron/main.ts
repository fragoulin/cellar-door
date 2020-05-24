import { app, BrowserWindow, Menu, session, ipcMain } from 'electron'
import { ipcMainService } from '../inversify/mainDependencies'
import * as i18nextBackend from 'i18next-electron-fs-backend'
import fs from 'fs'
import * as MenuBuilder from './menus/menu-builder'

const isDev = process.env.NODE_ENV === 'development'

/**
 * Path to main webpack entry.
 *
 * Automatically set by electron forge.
 */
declare const MAIN_WINDOW_WEBPACK_ENTRY: string

/**
 * Path to preload file.
 *
 * Automatically set by electron forge.
 */
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow

/**
 * Set CSP header for packaged (production) application.
 */
function setCspHeaders(): void {
  if (isDev) return
  session.defaultSession.webRequest.onHeadersReceived(
    (details, callbackHeaders) => {
      callbackHeaders({
        responseHeaders: {
          ...details.responseHeaders,
          'Content-Security-Policy': ["script-src 'self' 'unsafe-inline'"],
        },
      })
    }
  )
}

/**
 * Create application menu.
 */
function createMenu(): Menu {
  return MenuBuilder.buildMenu(app)
}

/**
 * Create main window (set headers, load URL and initialize menu).
 */
function createWindow(): void {
  setCspHeaders()

  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Cellar door',
    webPreferences: {
      contextIsolation: true,
      devTools: isDev,
      enableRemoteModule: false,
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  })

  // Configure backend for i18next
  i18nextBackend.mainBindings(ipcMain, win, fs)

  // and load the index.html of the app.
  win.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools()
  }

  // Initialize menu.
  Menu.setApplicationMenu(createMenu())
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow).catch(console.error)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  } else {
    i18nextBackend.clearMainBindings(ipcMain)
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Register IPC listeners for main process.
ipcMainService.registerListeners()
