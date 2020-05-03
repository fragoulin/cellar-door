import { app, BrowserWindow, Menu, session } from 'electron'

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow

function setCspHeaders (): void {
  // Add CSP HTTP header if application is packaged.
  if (app.isPackaged) {
    session.defaultSession.webRequest.onHeadersReceived((details, callbackHeaders) => {
      callbackHeaders({
        responseHeaders: {
          ...details.responseHeaders,
          'Content-Security-Policy': ['script-src \'self\' \'unsafe-inline\'']
        }
      })
    })
  }
}

function createMenu (): Menu {
  return Menu.buildFromTemplate([
    {
      label: 'Cellar',
      submenu: [
        { label: 'New cellar' },
        { label: 'New emulator' },
        { type: 'separator' },
        { label: 'Open' },
        { label: 'Open recent' },
        { type: 'separator' },
        { label: 'Save' },
        { label: 'Save As' },
        { type: 'separator' },
        { label: 'Close' },
        { type: 'separator' },
        {
          label: 'Exit',
          click (): void {
            app.quit()
          }
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        { label: 'About' }
      ]
    }
  ])
}

function createWindow (): void {
  setCspHeaders()

  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true // TODO remove nodeIntegration and use preload
    }
  })

  // and load the index.html of the app.
  win.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  // Open the DevTools.
  win.webContents.openDevTools()

  // Initialize menu.
  Menu.setApplicationMenu(createMenu())
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
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
// app.allowRendererProcessReuse = true
/*
ipcMain.on('toMain', () => {
  fs.readdir('resources/emulators', (err: NodeJS.ErrnoException | null, files: string[]) => {
    // Do something with file contents

    // Send result back to renderer process
    win.webContents.send('fromMain', files);
  });
});
*/
