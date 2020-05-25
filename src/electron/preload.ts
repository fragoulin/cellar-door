import { contextBridge, ipcRenderer } from 'electron'
import * as backend from 'i18next-electron-fs-backend'

/**
 * Custom interface to type Window object with IPC functionalities.
 */
interface Api {
  api: {
    receive(name: string, ...args: unknown[]): void
    send(name: string, ...args: unknown[]): void
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
    const validChannels = [
      'dialogSync',
      'saveState',
      'loadState',
      'updateLanguage',
    ]
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, ...args)
    }
  },
  receive: (channel: string, func: Function) => {
    const validChannels = ['dialogSyncResult', 'stateSaved', 'stateLoaded']
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (_event, ...args) => func(...args))
    }
  },
  i18nextElectronBackend: backend.preloadBindings(ipcRenderer),
})
