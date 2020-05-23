import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import i18nBackend from 'i18next-electron-fs-backend'
import { CellarWin } from './preload'

i18n
  // Filesystem backend to access translations in locales directory
  .use(i18nBackend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    backend: {
      // path where resources get loaded from
      loadPath: './locales/{{lng}}/{{ns}}.json',
      // path to post missing resources
      addPath: './locales/{{lng}}/{{ns}}.missing.json',
      // jsonIndent to use when storing json files
      jsonIndent: 2,
      ipcRenderer: (window as CellarWin).api.i18nextElectronBackend,
    },
    debug: true,
    saveMissing: true,
    fallbackLng: 'en',
    whitelist: ['en', 'fr'],
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    react: {
      wait: false,
    },
  })

export default i18n
