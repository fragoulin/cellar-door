import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { withTranslation, WithTranslation } from 'react-i18next'
import { Cellar } from 'app/src/models/cellar'
import { Emulator } from 'app/src/models/emulator/types'

/**
 * Properties definition for this component.
 */
export interface EmulatorsListComponentStateProperties {
  cellar: Cellar | undefined
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
        <div className="EmulatorsList">
          {this.props.emulatorsInCellar.map((emulator) => (
            <Button component={Link} to={`/emulator/${emulator.Id}`}>
              {emulator.shortName}
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
