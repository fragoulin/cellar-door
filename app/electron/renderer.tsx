import ReactDOM from 'react-dom'
import React from 'react'
import { Store } from '@reduxjs/toolkit'
import * as i18nConfig from 'localization/i18next.config'
import { i18n as I18n } from 'i18next'
import { cellarImported } from 'redux/modules/cellar'
import { CellarWin } from './preload'
import WebFont from 'webfontloader'
import { handleMenuClick } from './menu/menu-handler'
import store, { RootState } from 'redux/store'
import {
  UpdateLanguageChannel,
  MenuClickChannel,
  DialogOpenResultChannel,
} from './constants'
import Root from 'components/main/root/root'
import 'react-hot-loader'
import { currentLocaleSet } from 'redux/modules/preferences'
import { Provider } from 'react-redux'

// Load required fonts for material. Required font weights are 300, 400, 500 and 700
// https://material-ui.com/components/typography/#general
WebFont.load({ google: { families: ['Roboto:300,400,500,700'] } })

/**
 * Main element is the entry point for HTML content.
 */
const main = document.querySelector('#root')

/**
 * Typed window with cellar properties.
 */
const win = window as CellarWin

/**
 * Create root element of cellar application.
 *
 * @param store - redux store
 * @param i18n - i18next instance
 */
function createRoot(store: Store, i18n: I18n): void {
  ReactDOM.render(
    <Provider store={store}>
      <Root i18n={i18n} />
    </Provider>,
    main
  )
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
  win.api.receive(MenuClickChannel, (menuId: string, ...args: unknown[]) => {
    handleMenuClick(store, menuId, ...args)
  })
}

/**
 * Listen for import state from main process.
 */
function listenForImport(store: Store): void {
  win.api.receive(DialogOpenResultChannel, (state: RootState) => {
    store.dispatch(cellarImported(state))
  })
}

/**
 * Notify main process regarding language retrieved from persisted state.
 *
 * @param language - language retrieved from persisted state.
 */
function notifyMainProcess(language: string): void {
  win.api.send(UpdateLanguageChannel, language)
}

// Wait for i18next initialization before creating root element.
const state = store.getState()
const language = state.preferences.present.currentLocale
i18nConfig
  .whenReady(language)
  .then((i18n) => {
    notifyMainProcess(language)
    listenForLanguageUpdate(store, i18n)
    listenForMenuClick(store)
    listenForImport(store)
    createRoot(store, i18n)
  })
  .catch(console.error)
