import './create-emulator.css'
import React from 'react'
import { Emulator } from '../../../../models/emulator/emulator'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { EmulatorSummary } from '../emulator-summary/emulator-summary-component'
import { FormattedMessage } from 'react-intl'

// Interface for component state
export interface CreateEmulatorComponentStateProperties {
  emulator: Emulator | undefined;
}

// Interface for component dispatch properties
export interface CreateEmulatorComponentDispatchProperties {
  addEmulatorToCellar(emulator: Emulator): void;
}

export class CreateEmulator extends React.PureComponent<CreateEmulatorComponentStateProperties & CreateEmulatorComponentDispatchProperties> {
  componentDidMount (): void {
    if (this.props.emulator) {
      this.props.addEmulatorToCellar(this.props.emulator)
    }
  }

  public render (): React.ReactNode {
    if (!this.props.emulator) {
      return null
    }

    return (
      <div className="CreateEmulator">
        <div>
          <h1><FormattedMessage id="create-emulator.title"/></h1>
          <EmulatorSummary emulator={this.props.emulator}/>
        </div>
        <Button color="secondary" component={Link} to="/"><FormattedMessage id="common.back-to-cellar"/></Button>
        <Button color="primary" component={Link} to="/add-emulator/"><FormattedMessage id="create-emulator.add-another"/></Button>
      </div>
    )
  }
}
