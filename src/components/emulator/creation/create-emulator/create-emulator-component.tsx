import './create-emulator.css'
import React from 'react'
import { Emulator } from '../../../../models/emulator/emulator'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { EmulatorSummary } from '../emulator-summary/emulator-summary-component'

// Interface for component state
export interface CreateEmulatorComponentStateProperties {
  emulator: Emulator | undefined;
}

export class CreateEmulator extends React.PureComponent<CreateEmulatorComponentStateProperties> {
  public render (): React.ReactNode {
    if (!this.props.emulator) {
      return null
    }

    return (
      <div className="CreateEmulator">
        <div>
          <h1>Emulator successfully created</h1>
          <EmulatorSummary emulator={this.props.emulator}/>
        </div>
        <Button color="secondary" component={Link} to="/">Back to cellar</Button>
        <Button color="primary" component={Link} to="/add-emulator/">Add another emulator</Button>
      </div>
    )
  }
}
