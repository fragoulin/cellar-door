import ReactDOM from 'react-dom'
import React, { ReactElement, Suspense } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Router } from '../src/components/router/router-component'
import { Store } from '@reduxjs/toolkit'
import { I18nextProvider } from 'react-i18next'
import * as i18nConfig from '../src/localization/i18next.config'
import { i18n as I18n } from 'i18next'
import { currentLocaleSet } from '../src/redux/modules/cellar'
import { CellarWin } from './preload'
import WebFont from 'webfontloader'
import { handleMenuClick } from './menu-handler'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '../src/redux/store'

// Load required fonts for material. Required font weights are 300, 400, 500 and 700
// https://material-ui.com/components/typography/#general
WebFont.load({ google: { families: ['Roboto:300,400,500,700'] } })

/**
 * Main element is the entry point of HTML content.
 */
const main = document.createElement('main')
document.body.appendChild(main)

/**
 * Create root element of cellar application.
 *
 * @param store - redux store
 * @param i18n - i18next instance
 */
function createRoot(store: Store, i18n: I18n): void {
  const root: ReactElement = (
    <section id="root">
      <CssBaseline />
      <React.StrictMode>
        <I18nextProvider i18n={i18n}>
          <Suspense fallback="loading">
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <header></header>
                <Router />
                <footer></footer>
              </PersistGate>
            </Provider>
          </Suspense>
        </I18nextProvider>
      </React.StrictMode>
    </section>
  )

  ReactDOM.render(root, main)
}

/**
 * Listen for language change from i18next in order to set current locale in redux store.
 *
 * @param store - redux store.
 * @param i18n - i18next instance.
 */
function listenForLanguageUpdate(store: Store, i18n: I18n): void {
  i18n.on('languageChanged', (language) => {
    store.dispatch(currentLocaleSet(language))
  })
}

/**
 * Listen for menu click from main process.
 *
 * @param store - redux store.
 */
function listenForMenuClick(store: Store): void {
  ;(window as CellarWin).api.receive(
    'menuClick',
    (menuId: string, ...args: unknown[]) => {
      handleMenuClick(store, menuId, args)
    }
  )
}

/**
 * Notify main process regarding language retrieved from persisted state.
 *
 * @param language - language retrieved from persisted state.
 */
function notifyMainProcess(language: string): void {
  ;(window as CellarWin).api.send('updateLanguage', language)
}

// Wait for i18next initialization before creating root element.
persistor.subscribe(() => {
  const state = store.getState()
  const language = state.cellar.currentLocale
  i18nConfig
    .whenReady(language)
    .then((i18n) => {
      notifyMainProcess(language)
      listenForLanguageUpdate(store, i18n)
      listenForMenuClick(store)
      createRoot(store, i18n)
    })
    .catch(console.error)
})
