import { contextBridge, ipcRenderer } from 'electron'

/**
 * Custom interface to type Window object with IPC functionalities.
 */
interface Api {
  api: {
    receive(name: string, ...args: unknown[]): void
    send(name: string, ...args: unknown[]): void
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
    const validChannels = ['dialogSync', 'saveState', 'loadState']
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, ...args)
    }
  },
  receive: (channel: string, func: Function) => {
    const validChannels = ['dialogSyncResult', 'stateSaved', 'stateLoaded']
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args))
    }
  },
})
