import { app, BrowserWindow, Menu, session, ipcMain } from 'electron'
import { registerListeners } from 'services/ipc-main-service'
import * as i18nextBackend from 'i18next-electron-fs-backend'
import fs from 'fs'
import menuTemplate from './menu/menu'
import { i18n as I18n } from 'i18next'
import * as i18nConfig from 'localization/i18next.config'
import { isDev } from 'services/app-service'
import contextMenu from 'electron-context-menu'
import { contextMenuOptions } from './menu/context-menu'
import { UpdateLanguageChannel } from './constants'
import { pkginfo } from "./package-info"

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

// Reference on function to dispose context menu.
let disposeContextMenu: () => void | undefined

/**
 * Set CSP header for packaged (production) application.
 */
function setCspHeaders(): void {
  if (isDev()) return
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
 * Create application menu
 *
 * @param i18n - the i18n instance used to translate menu items.
 */
function createMenu(i18n: I18n): void {
  const menu = Menu.buildFromTemplate(menuTemplate(app, i18n))
  Menu.setApplicationMenu(menu)
}

/**
 * Create context menu.
 */
function createContextMenu(i18n: I18n): void {
  // Dispose resources in case of previous context menu
  if (disposeContextMenu) {
    disposeContextMenu()
  }

  disposeContextMenu = contextMenu(contextMenuOptions(i18n))
}

/**
 * Create application menu and context menu.
 *
 * @param i18n - i18n instance to translate menu items.
 */
function createMenus(i18n: I18n): void {
  createMenu(i18n)
  createContextMenu(i18n)
}

/**
 * Customize about menu box.
 */
function customizeAboutMenu(): void {
  app.setAboutPanelOptions({
    applicationName: pkginfo.productName,
    applicationVersion: `Version: ${pkginfo.version}`,
    website: pkginfo.homepage,
    copyright: `© ${pkginfo.author}`
  })
}

/**
 * Create main window (set headers, load URL and initialize menu).
 */
function createWindow(): void {
  setCspHeaders()
  customizeAboutMenu()

  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Cellar door',
    webPreferences: {
      contextIsolation: true,
      devTools: isDev(),
      enableRemoteModule: false,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  })

  // Configure backend for i18next
  i18nextBackend.mainBindings(ipcMain, win, fs)

  // and load the index.html of the app.
  win.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  // Hide default menu (wait for i18n to be ready)
  Menu.setApplicationMenu(null)

  // Open the DevTools.
  win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow).catch(console.error)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform === 'darwin') {
    i18nextBackend.clearMainBindings(ipcMain)
    disposeContextMenu()
  } else {
    app.quit()
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
registerListeners()

// Listen for 'updateLanguage' event from renderer in order to initialize menu with correct language.
ipcMain.on(UpdateLanguageChannel, (_event, language: string) => {
  i18nConfig
    .whenReady(language)
    .then((i18n) => {
      // Listen for languageChanged event on i18next, triggered from the menu 'languages'
      i18n.on('languageChanged', () => {
        createMenus(i18n)
      })
      // Create menu immediately when language is available from renderer process.
      createMenus(i18n)
    })
    .catch(console.error)
})

// Initialize rollbar for production mode
if (!isDev()) {
  require('services/rollbar-service')
}
