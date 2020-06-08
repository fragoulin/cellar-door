import './create-emulator.scss'
import React from 'react'
import { Emulator } from 'models/emulator/types'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import EmulatorSummary from 'components/emulator/creation/emulator-summary/emulator-summary-component'
import { withTranslation, WithTranslation } from 'react-i18next'

/**
 * Properties definition for this component (from redux state).
 */
export interface CreateEmulatorComponentStateProperties {
  emulator: Emulator | undefined
}

/**
 * Create emulator component is the result page after an emulator has been created.
 */
class CreateEmulator extends React.PureComponent<
  CreateEmulatorComponentStateProperties & WithTranslation
> {
  /**
   * Render emulator summary and control buttons to go back to cellar or create another emulator.
   *
   * @returns the newly created node.
   */
  public render(): React.ReactNode {
    if (!this.props.emulator) {
      return null
    }

    return (
      <div className="create-emulator">
        <div>
          <h1>
            {this.props.t('createEmulator.title', {
              name: this.props.emulator.shortName,
            })}
          </h1>
          <EmulatorSummary emulator={this.props.emulator} />
        </div>
        <Button color="secondary" component={Link} to="/" draggable={false}>
          {this.props.t('common.backToCellar')}
        </Button>
        <Button
          color="primary"
          component={Link}
          to="/add-emulator/"
          draggable={false}
        >
          {this.props.t('createEmulator.addAnother')}
        </Button>
      </div>
    )
  }
}

export default withTranslation()(CreateEmulator)
