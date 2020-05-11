import { contextBridge, ipcRenderer } from 'electron'

interface Api {
  api: {
    receive: Function;
    send: Function;
  };
}

export type CellarWin = Window & typeof globalThis & Api

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  'api', {
    send: (channel: string, ...args: unknown[]) => {
      // whitelist channels
      const validChannels = ['dialogSync']
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, ...args)
      }
    },
    receive: (channel: string, func: Function) => {
      const validChannels = ['dialogSyncResult']
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args))
      }
    }
  }
)
