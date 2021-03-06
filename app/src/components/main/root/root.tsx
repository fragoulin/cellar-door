import { CssBaseline, ThemeProvider } from '@material-ui/core'
import React, { Suspense } from 'react'
import { I18nextProvider } from 'react-i18next'
import { connect } from 'react-redux'
import { Router } from '../router/router'
import { i18n as I18n } from 'i18next'
import { hot, setConfig } from 'react-hot-loader'
import useStyles from './root-styles'
import { getTheme } from 'themes/base'
import { RootState } from 'redux/store'

/**
 * Properties definition for this component.
 */
type RootComponentProperties = {
  i18n: I18n
  darkMode: boolean
}

/**
 * Root component.
 */
function Root(props: RootComponentProperties): React.ReactElement {
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
              <ThemeProvider
                theme={(outerTheme): { darkMode: boolean } => ({
                  darkMode: props.darkMode,
                  ...outerTheme,
                })}
              >
                <Router />
              </ThemeProvider>
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

const connectedRoot = connect((state: RootState) => ({
  darkMode: state.preferences.present.darkMode,
}))(Root)

export default hot(module)(connectedRoot)
