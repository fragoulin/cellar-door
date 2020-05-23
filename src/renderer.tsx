import ReactDOM from 'react-dom'
import React, { ReactElement } from 'react'
import 'typeface-roboto'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Router } from './components/router/router-component'
import 'reflect-metadata'
import { IntlProvider } from 'react-intl'
import * as CellarStore from './redux/store'
import { currentLocaleSet } from './redux/modules/cellar'
import { Store } from '@reduxjs/toolkit'
import { localeService } from './rendererDependencies'

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
  // Locales
  const locale = navigator.language.split(/[-_]/)[0] // locale without region code
  store.dispatch(currentLocaleSet(locale))

  const messages = localeService.getMessagesForLocale(locale)

  const root: ReactElement = (
    <section id="root">
      <CssBaseline />
      <React.StrictMode>
        <IntlProvider
          locale={locale}
          key={locale}
          defaultLocale={localeService.getDefaultLocale()}
          messages={messages}
        >
          <header></header>
          <Router store={store} />
          <footer></footer>
        </IntlProvider>
      </React.StrictMode>
    </section>
  )

  ReactDOM.render(root, main)
}

// Wait for redux store to be ready before creating root element.
CellarStore.whenReady((store) => {
  createRoot(store)
})
