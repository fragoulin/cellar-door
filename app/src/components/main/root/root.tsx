import './root.scss'
import { CssBaseline } from '@material-ui/core'
import React, { Suspense } from 'react'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import { Router } from '../router/router'
import { Store } from 'redux'
import { i18n as I18n } from 'i18next'
import { hot, setConfig } from 'react-hot-loader'

/**
 * Properties definition for this component.
 */
type RootComponentProperties = {
  i18n: I18n
  store: Store
}

/**
 * Root component.
 */
function Root(props: RootComponentProperties): React.ReactElement {
  return (
    <section id="root">
      <CssBaseline />
      <React.StrictMode>
        <I18nextProvider i18n={props.i18n}>
          <Suspense fallback="loading">
            <Provider store={props.store}>
              <Router />
            </Provider>
          </Suspense>
        </I18nextProvider>
      </React.StrictMode>
    </section>
  )
}

setConfig({
  showReactDomPatchNotification: false,
})

export default hot(module)(Root)
