import { CssBaseline, ThemeProvider } from '@material-ui/core'
import React, { Suspense } from 'react'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import { Router } from '../router/router'
import { Store } from 'redux'
import { i18n as I18n } from 'i18next'
import { hot, setConfig } from 'react-hot-loader'
import theme from '../theme/main'
import useStyles from './root-styles'

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
  const classes = useStyles()

  return (
    <section id="root" className={classes.root}>
      <CssBaseline />
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <I18nextProvider i18n={props.i18n}>
            <Suspense fallback="loading">
              <Provider store={props.store}>
                <Router />
              </Provider>
            </Suspense>
          </I18nextProvider>
        </ThemeProvider>
      </React.StrictMode>
    </section>
  )
}

setConfig({
  showReactDomPatchNotification: false,
})

export default hot(module)(Root)
