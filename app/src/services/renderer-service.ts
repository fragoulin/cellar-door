import { CellarWin } from 'app/electron/preload'

let _isDev: boolean | undefined
let _resourcesPath: string | undefined

/**
 * Retrieve dev mode and cache the result.
 */
function isDev(): boolean {
  if (_isDev === undefined) {
    _isDev = (window as CellarWin).api.sendSync('isDev') as boolean
  }

  return _isDev
}

/**
 * Retrieve resources path and cache the result.
 */
function getResourcesPath(): string {
  if (_resourcesPath === undefined) {
    _resourcesPath = (window as CellarWin).api.sendSync(
      'getResourcesPath'
    ) as string
  }

  return _resourcesPath
}

export { isDev, getResourcesPath }
