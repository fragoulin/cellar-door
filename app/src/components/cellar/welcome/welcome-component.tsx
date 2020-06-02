import * as React from 'react'
import './welcome.scss'
import { Cellar } from 'models/cellar'
import EmulatorsList from 'container/cellar/emulators-list'
import FreshInstallation from 'container/cellar/fresh-installation'
import { Emulator } from 'models/emulator/types'
import { withTranslation, WithTranslation } from 'react-i18next'

/**
 * Properties definition for this component.
 */
export interface WelcomeComponentStateProperties {
  cellar: Cellar | undefined
  emulatorsInCellar: Emulator[]
}

/**
 * Welcome component is the entry point.
 * It displays either the list of emulators of the current cellar (if available) or simply renders the fresh installation component.
 */
class Welcome extends React.PureComponent<
  WelcomeComponentStateProperties & WithTranslation
> {
  /**
   * If current cellar exists and contains emulator(s), renders the emulators list component, else renders the fresh installation component.
   *
   * @returns the newly created node.
   */
  render(): React.ReactNode {
    return (
      <div className="Welcome">
        <h1>{this.props.t('welcome.title')}</h1>
        {
          // Check for cellar
          this.props.cellar && this.props.emulatorsInCellar.length > 0 ? (
            <EmulatorsList />
          ) : (
            <FreshInstallation />
          )
        }
      </div>
    )
  }
}

export default withTranslation()(Welcome)
