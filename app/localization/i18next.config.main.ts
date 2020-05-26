import i18n, { i18n as I18n, InitOptions } from 'i18next'
import i18nBackend from 'i18next-fs-backend'
import whitelist from './whitelist'

const isDev = process.env.NODE_ENV === 'development'

const options: InitOptions = {
  backend: {
    // path where resources get loaded from
    loadPath: './app/localization/locales/{{lng}}/{{ns}}.json',
    // path to post missing resources
    addPath: './app/localization/locales/{{lng}}/{{ns}}.missing.json',
  },
  debug: isDev,
  saveMissing: true,
  fallbackLng: 'en',
  whitelist: whitelist.langs,
}

/**
 * Build a promise for i18next initialization on main process.
 *
 * @param language - optional language for default initialization.
 * @returns a promise for i18next initialization.
 */
export const whenReady = (language?: string): Promise<I18n> => {
  return new Promise((resolve, reject) => {
    if (i18n.isInitialized) {
      if (language && i18n.language !== language) {
        i18n.changeLanguage(language, (error) => error && console.error)
      }
      resolve(i18n)
    } else {
      i18n
        // Filesystem backend to access translations in locales directory via electron IPC
        // https://github.com/reZach/i18next-electron-fs-backend
        .use(i18nBackend)

      if (language) {
        options.lng = language
      }

      // init i18next
      // for all options read: https://www.i18next.com/overview/configuration-options
      i18n
        .init(options)
        .then(() => resolve(i18n))
        .catch(reject)
    }
  })
}
