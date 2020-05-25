import i18n, { i18n as I18n, InitOptions } from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import i18nBackend from 'i18next-electron-fs-backend'
import { initReactI18next } from 'react-i18next'
import { CellarWin } from '../electron/preload'
import whitelist from './whitelist'

const win = window as CellarWin

const options: InitOptions = {
  backend: {
    // path where resources get loaded from
    loadPath: './locales/{{lng}}/{{ns}}.json',
    // path to post missing resources
    addPath: './locales/{{lng}}/{{ns}}.missing.json',
    ipcRenderer: win.api.i18nextElectronBackend,
  },
  debug: false,
  saveMissing: false,
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
 * Listen for language change and update i18n language.
 */
win.api.i18nextElectronBackend.onLanguageChange((args: { lng: string }) => {
  if (args.lng !== i18n.language) {
    i18n.changeLanguage(args.lng, (error) => error && console.error)
  }
})

/**
 * Build a promise for i18next initialization on renderer process.
 *
 * @returns a promise for i18next initialization.
 */
export const whenReady = (): Promise<I18n> => {
  return new Promise((resolve, reject) => {
    if (i18n.isInitialized) {
      resolve(i18n)
    } else {
      i18n
        // Filesystem backend to access translations in locales directory via electron IPC
        // https://github.com/reZach/i18next-electron-fs-backend
        .use(i18nBackend)
        // detect user language
        // learn more: https://github.com/i18next/i18next-browser-languageDetector
        .use(LanguageDetector)
        // pass the i18n instance to react-i18next.
        .use(initReactI18next)

      // init i18next
      // for all options read: https://www.i18next.com/overview/configuration-options
      i18n
        .init(options)
        .then(() => resolve(i18n))
        .catch(reject)
    }
  })
}

/**
 * Listener for language changed and notify main process.
 */
i18n.on('languageChanged', (language) => {
  win.api.send('updateLanguage', language)
})
