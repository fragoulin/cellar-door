import i18n, { i18n as I18n, InitOptions } from 'i18next'
import i18nBackend from 'i18next-electron-fs-backend'
import { initReactI18next } from 'react-i18next'
import { CellarWin } from '../../electron/preload'
import whitelist from './whitelist'

const rendererProcess = typeof window !== 'undefined'

// Compute resources path to access locales.
let resourcesPath: string
if (rendererProcess) {
  // In renderer process, use IPC to retrieve resources path.
  resourcesPath = (window as CellarWin).api.sendSync(
    'getResourcesPath'
  ) as string
} else {
  // In main process, use node process
  const app = require('electron').app
  // If the app is not packaged (dev mode), the resources path references electron installation in node_modules directory.
  resourcesPath = app.isPackaged ? process.resourcesPath : 'resources'
}

const options: InitOptions = {
  backend: {
    // path where resources get loaded from
    loadPath: `${resourcesPath}/locales/{{lng}}/{{ns}}.json`,
    // path to post missing resources
    addPath: `${resourcesPath}/locales/{{lng}}/{{ns}}.missing.json`,
    ipcRenderer: rendererProcess
      ? (window as CellarWin).api.i18nextElectronBackend
      : undefined,
  },
  debug: false,
  saveMissing: false,
  lng: 'en',
  fallbackLng: 'en',
  whitelist: whitelist.langs,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  react: {
    wait: false,
  },
}

/**
 * Listen for language change from backend and update i18n language.
 */
if (rendererProcess) {
  const win = window as CellarWin
  win.api.i18nextElectronBackend.onLanguageChange((language: string) => {
    if (language !== i18n.language) {
      i18n.changeLanguage(language).catch(console.error)
    }
  })
}

/**
 * Build a promise for i18next initialization.
 *
 * @param language - optional language for i18next initialization.
 * @returns a promise for i18next initialization.
 */
export const whenReady = (language?: string): Promise<I18n> => {
  return new Promise((resolve, reject) => {
    if (i18n.isInitialized) {
      resolve(i18n)
    } else {
      i18n
        // Filesystem backend to access translations in locales directory via electron IPC
        // https://github.com/reZach/i18next-electron-fs-backend
        .use(i18nBackend)
        // pass the i18n instance to react-i18next.
        .use(initReactI18next)

      // Set default language if available
      options.lng = language

      // init i18next
      // for all options read: https://www.i18next.com/overview/configuration-options
      i18n
        .init(options)
        .then(() => resolve(i18n))
        .catch(reject)
    }
  })
}
