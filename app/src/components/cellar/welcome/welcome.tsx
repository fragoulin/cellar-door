import * as React from 'react'
import { Cellar } from 'models/cellar'
import EmulatorsList from 'container/cellar/emulators-list'
import FreshInstallation from 'container/cellar/fresh-installation'
import { Emulator } from 'models/emulator/types'
import { withTranslation, WithTranslation } from 'react-i18next'
import { useEffect } from 'react'
import useStyles from './welcome-styles'

/**
 * Properties definition for this component (from redux state).
 */
export type WelcomeComponentStateProperties = {
  cellar: Cellar | undefined
  emulatorsInCellar: Emulator[] | undefined
}

/**
 * Properties definition for this component (from redux dispatch).
 */
export type WelcomeComponentDispatchProperties = {
  createCellar(): void
}

/**
 * Welcome component is the entry point.
 * It displays either the list of emulators of the current cellar (if available) or simply renders the fresh installation component.
 */
function Welcome(
  props: WelcomeComponentStateProperties &
    WelcomeComponentDispatchProperties &
    WithTranslation
): React.ReactElement {
  const classes = useStyles()

  useEffect(() => {
    // Create cellar if needed
    if (undefined === props.cellar) {
      props.createCellar()
    }
  }, [props])

  return (
    <div className={classes.welcomeMain}>
      <h1 dangerouslySetInnerHTML={{ __html: props.t('welcome.title') }}></h1>
      {
        // Check for cellar
        props.emulatorsInCellar && props.emulatorsInCellar.length > 0 ? (
          <EmulatorsList />
        ) : (
          <FreshInstallation />
        )
      }
    </div>
  )
}

export default withTranslation()(Welcome)
