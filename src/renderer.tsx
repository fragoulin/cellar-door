import ReactDOM from 'react-dom'
import React, { ReactElement, Suspense } from 'react'
import 'typeface-roboto'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Router } from './components/router/router-component'
import 'reflect-metadata'
import * as CellarStore from './redux/store'
import { Store } from '@reduxjs/toolkit'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18next.config'

/**
 * Main element is the entry point of HTML content.
 */
const main = document.createElement('main')
document.body.appendChild(main)

/**
 * Create root element of cellar application.
 *
 * @param store - redux store
 */
function createRoot(store: Store): void {
  // TODO locale from detectlocale
  //  store.dispatch(currentLocaleSet(locale))

  const root: ReactElement = (
    <section id="root">
      <CssBaseline />
      <React.StrictMode>
        <I18nextProvider i18n={i18n}>
          <Suspense fallback="loading">
            <header></header>
            <Router store={store} />
            <footer></footer>
          </Suspense>
        </I18nextProvider>
      </React.StrictMode>
    </section>
  )

  ReactDOM.render(root, main)
}

// Promise for redux store to be ready before creating root element.
CellarStore.whenReady((store) => {
  createRoot(store)
})
