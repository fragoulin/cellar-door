import { CssBaseline, ThemeProvider } from '@material-ui/core'
import React, { Suspense } from 'react'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import { Router } from '../router/router'
import { Store } from 'redux'
import { i18n as I18n } from 'i18next'
import { hot, setConfig } from 'react-hot-loader'
import useStyles from './root-styles'
import { getTheme } from 'theme/themes/base'

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

  // Retrieve initial theme
  const themeName = props.darkMode ? 'darkTheme' : 'lightTheme'
  const theme = getTheme(themeName)

  return (
    <div id="root" className={classes.root}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <React.StrictMode>
          <I18nextProvider i18n={props.i18n}>
            <Suspense fallback="loading">
              <Provider store={props.store}>
                <ThemeProvider
                  theme={(outerTheme): RootComponentStateProperties => ({
                    darkMode: props.darkMode,
                    ...outerTheme,
                  })}
                >
                  <Router />
                </ThemeProvider>
              </Provider>
            </Suspense>
          </I18nextProvider>
        </React.StrictMode>
      </ThemeProvider>
    </div>
  )
}

setConfig({
  showReactDomPatchNotification: false,
})

export default hot(module)(Root)
