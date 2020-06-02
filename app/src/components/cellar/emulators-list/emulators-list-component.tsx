import './emulators-list.scss'
import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { withTranslation, WithTranslation } from 'react-i18next'
import { Emulator } from 'models/emulator/types'
import EmulatorLogoComponent from 'components/cellar/emulator-logo/emulator-logo-component'

/**
 * Properties definition for this component.
 */
export interface EmulatorsListComponentStateProperties {
  emulatorsInCellar: Emulator[]
}

/**
 * Emulators list component renders the list of emulators associated to the current cellar.
 */
class EmulatorsList extends React.PureComponent<
  EmulatorsListComponentStateProperties & WithTranslation
> {
  /**
   * Render title and the list of emulators.
   *
   * @returns the newly created node.
   */
  public render(): React.ReactNode {
    return (
      <>
        <h2>{this.props.t('emulatorsList.title')}</h2>
        <div>
          {this.props.emulatorsInCellar.map((emulator) => (
            <Button
              key={emulator.Id}
              component={Link}
              to={`/emulator/${emulator.Id}`}
            >
              <EmulatorLogoComponent emulator={emulator} />
            </Button>
          ))}
        </div>
        <Button color="primary" component={Link} to="/add-emulator/">
          {this.props.t('freshInstallation.buttonText')}
        </Button>
      </>
    )
  }
}

export default withTranslation()(EmulatorsList)
