import ReactDOM from 'react-dom'
import React, { ReactElement } from 'react'
import 'typeface-roboto'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Router } from './components/router/router-component'
import 'reflect-metadata'
import { IntlProvider } from 'react-intl'
import * as LocaleService from './services/locale-service'
import { CellarActions } from './redux/modules/cellar'
import store from './redux/store'

// Main rendering
const main = document.createElement('main')
document.body.appendChild(main)

// Locales
const locale = navigator.language.split(/[-_]/)[0] // locale without region code
store.dispatch(CellarActions.setCurrentLocale(locale))

const messages = LocaleService.getMessagesForLocale(locale)

const root: ReactElement = (
  <section id="root">
    <CssBaseline/>
    <React.StrictMode>
      <IntlProvider locale={locale} key={locale} defaultLocale={LocaleService.DEFAULT_LOCALE} messages={messages}>
        <header></header>
        <Router store={store}/>
        <footer></footer>
      </IntlProvider>
    </React.StrictMode>
  </section>
)

ReactDOM.render(root, main)
