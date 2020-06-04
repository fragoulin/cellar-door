import { contextBridge, ipcRenderer } from 'electron'
import * as backend from 'i18next-electron-fs-backend'
import {
  DialogSyncChannel,
  UpdateLanguageChannel,
  getResourcesPathChannel,
  isDevChannel,
  DialogSyncResultChannel,
  MenuClickChannel,
  EnableMenuItem,
} from './constants'

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
  // Send asynchronous messages from renderer to main process
  send: (channel: string, ...args: unknown[]) => {
    // whitelist channels
    const validChannels = [
      DialogSyncChannel,
      UpdateLanguageChannel,
      EnableMenuItem,
    ]
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, ...args)
    } else {
      console.error(`Invalid channel for send : ${channel}`)
    }
  },
  // Send synchronous messages from renderer to main process
  sendSync: (channel: string, ...args: unknown[]): unknown => {
    // whitelist channels
    const validChannels = [getResourcesPathChannel, isDevChannel]
    if (validChannels.includes(channel)) {
      return ipcRenderer.sendSync(channel, ...args)
    } else {
      console.error(`Invalid channel for send : ${channel}`)
      return undefined
    }
  },
  // Send asynchronous messages from main to renderer process
  receive: (channel: string, func: Function) => {
    const validChannels = [DialogSyncResultChannel, MenuClickChannel]
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (_event, ...args) => func(...args))
    } else {
      console.error(`Invalid channel for receive : ${channel}`)
    }
  },
  i18nextElectronBackend: backend.preloadBindings(ipcRenderer),
})
