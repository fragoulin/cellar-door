import './create-emulator.css'
import React from 'react'
import { Emulator } from '../../../../models/emulator/types'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { EmulatorSummary } from '../emulator-summary/emulator-summary-component'
import { FormattedMessage } from 'react-intl'

/**
 * Properties definition for this component (from redux state).
 */
export interface CreateEmulatorComponentStateProperties {
  emulator: Emulator | undefined
}

/**
 * Properties definition for this component (from redux reducer).
 */
export interface CreateEmulatorComponentDispatchProperties {
  addEmulatorToCellar(emulator: Emulator): void
}

/**
 * Create emulator component is the result page after an emulator has been created.
 */
export class CreateEmulator extends React.PureComponent<
  CreateEmulatorComponentStateProperties &
    CreateEmulatorComponentDispatchProperties
> {
  /**
   * Add emulator to cellar when component is mounted.
   */
  componentDidMount(): void {
    if (this.props.emulator) {
      this.props.addEmulatorToCellar(this.props.emulator)
    }
  }

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
      <div className="CreateEmulator">
        <div>
          <h1>
            <FormattedMessage id="create-emulator.title" />
          </h1>
          <EmulatorSummary emulator={this.props.emulator} />
        </div>
        <Button color="secondary" component={Link} to="/">
          <FormattedMessage id="common.back-to-cellar" />
        </Button>
        <Button color="primary" component={Link} to="/add-emulator/">
          <FormattedMessage id="create-emulator.add-another" />
        </Button>
      </div>
    )
  }
}
