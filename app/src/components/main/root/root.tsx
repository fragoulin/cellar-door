import {
  CssBaseline,
  MuiThemeProvider,
  createMuiTheme,
  ThemeOptions,
} from '@material-ui/core'
import React, { Suspense } from 'react'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import { Router } from '../router/router'
import { Store } from 'redux'
import { i18n as I18n } from 'i18next'
import { hot, setConfig } from 'react-hot-loader'
import useStyles from './root-styles'

/**
 * Properties definition for this component.
 */
type RootComponentProperties = {
  i18n: I18n
  store: Store
}

/**
 * Properties definition for this component (from redux state).
 */
export type RootComponentStateProperties = {
  darkMode: boolean
}

/**
 * Root component.
 */
function Root(
  props: RootComponentProperties & RootComponentStateProperties
): React.ReactElement {
  const classes = useStyles()

  const themeOptions: ThemeOptions = {
    palette: {
      type: props.darkMode ? 'dark' : 'light',
    },
  }

  const muiTheme = createMuiTheme(themeOptions)

  return (
    <div id="root" className={classes.root}>
      <CssBaseline />
      <React.StrictMode>
        <MuiThemeProvider theme={muiTheme}>
          <I18nextProvider i18n={props.i18n}>
            <Suspense fallback="loading">
              <Provider store={props.store}>
                <Router />
              </Provider>
            </Suspense>
          </I18nextProvider>
        </MuiThemeProvider>
      </React.StrictMode>
    </div>
  )
}

setConfig({
  showReactDomPatchNotification: false,
})

export default hot(module)(Root)
