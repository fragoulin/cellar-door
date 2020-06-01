import { contextBridge, ipcRenderer } from 'electron'
import * as backend from 'i18next-electron-fs-backend'

/**
 * Custom interface to type Window object with IPC functionalities.
 */
interface Api {
  api: {
    receive(name: string, ...args: unknown[]): void
    send(name: string, ...args: unknown[]): void
    sendSync(name: string, ...args: unknown[]): unknown
    i18nextElectronBackend: typeof backend.preloadBindings
  }
}

/**
 * Custom window type based on Window.
 */
export type CellarWin = Window & typeof globalThis & Api

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('api', {
  send: (channel: string, ...args: unknown[]) => {
    // whitelist channels
    const validChannels = ['dialogSync', 'updateLanguage']
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, ...args)
    } else {
      console.error(`Invalid channel for send : ${channel}`)
    }
  },
  sendSync: (channel: string, ...args: unknown[]): unknown => {
    // whitelist channels
    const validChannels = ['getResourcesPath', 'isDev']
    if (validChannels.includes(channel)) {
      return ipcRenderer.sendSync(channel, ...args)
    } else {
      console.error(`Invalid channel for send : ${channel}`)
      return undefined
    }
  },
  receive: (channel: string, func: Function) => {
    const validChannels = ['dialogSyncResult', 'menuClick']
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (_event, ...args) => func(...args))
    } else {
      console.error(`Invalid channel for receive : ${channel}`)
    }
  },
  i18nextElectronBackend: backend.preloadBindings(ipcRenderer),
})
