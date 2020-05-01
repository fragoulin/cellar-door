import './configure-emulator.css'
import React from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { EmulatorId } from '../../../models/emulator'

// Interface for component init
interface Emulator {
  emulator: EmulatorId; // Default emulator
}

// Custom type to access to route parameters
type EmulatorProps = RouteComponentProps<{ emulator?: string }>

// Configure emulator component
export class ConfigureEmulator extends React.PureComponent<{} & EmulatorProps, Emulator> {
  constructor (props: {} & EmulatorProps & Emulator) {
    super(props)
    this.state = {
      emulator: this.props.match.params.emulator as EmulatorId || EmulatorId.MAME
    }
  }

  public render (): React.ReactNode {
    return (
      <div>
        Configure {this.state.emulator} emulator
        <Button color="secondary" component={Link} to={{ pathname: `/add-emulator/${this.state.emulator}` }}>Back</Button>
        <Button color="primary" component={Link} to="/create-emulator/">Confirm</Button>
      </div>
    )
  }
}
