import * as React from 'react'
import EmulatorsList from 'components/cellar/emulators-list/emulators-list'
import FreshInstallation from 'components/cellar/fresh-installation/fresh-installation'
import { withTranslation, WithTranslation } from 'react-i18next'
import { useEffect } from 'react'
import useStyles from './welcome-styles'
import { RootState } from 'redux/store'
import { useStore } from 'react-redux'
import { cellarCreated } from 'redux/modules/cellar'

/**
 * Welcome component is the entry point.
 * It displays either the list of emulators of the current cellar (if available) or simply renders the fresh installation component.
 */
function Welcome(props: WithTranslation): React.ReactElement {
  const classes = useStyles()
  const store = useStore()
  const state = store.getState() as RootState

  useEffect(() => {
    // Create cellar if needed
    if (undefined === state.cellar.present.currentCellar) {
      store.dispatch(cellarCreated())
    }
  })

  return (
    <div className={classes.welcomeMain}>
      <h1 dangerouslySetInnerHTML={{ __html: props.t('welcome.title') }}></h1>
      {
        // Check for cellar
        state.cellar.present.emulatorsInCellar &&
        state.cellar.present.emulatorsInCellar.length > 0 ? (
          <EmulatorsList />
        ) : (
          <FreshInstallation />
        )
      }
    </div>
  )
}

export default withTranslation()(Welcome)
