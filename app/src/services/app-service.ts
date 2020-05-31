import { CellarWin } from 'app/electron/preload'

const rendererProcess = typeof window !== 'undefined'

let _isDev: boolean | undefined
let _resourcesPath: string | undefined

/**
 * Retrieve dev mode and cache the result.
 */
function isDev(): boolean {
  if (_isDev === undefined) {
    if (rendererProcess) {
      _isDev = (window as CellarWin).api.sendSync('isDev') as boolean
    } else {
      const app = require('electron').app
      _isDev = !app.isPackaged
    }
  }

  return _isDev
}

/**
 * Retrieve resources path and cache the result.
 */
function getResourcesPath(): string {
  if (_resourcesPath === undefined) {
    if (rendererProcess) {
      _resourcesPath = (window as CellarWin).api.sendSync(
        'getResourcesPath'
      ) as string
    } else {
      _resourcesPath = isDev() ? 'resources' : process.resourcesPath
    }
  }

  return _resourcesPath
}

export { isDev, getResourcesPath }
