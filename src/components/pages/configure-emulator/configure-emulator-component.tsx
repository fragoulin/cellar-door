import './configure-emulator.css'
import React from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import { Button } from '@material-ui/core'

// Custom type to access to route parameters
type ComponentProperties = RouteComponentProps<{ emulatorId?: string }>

// Interface for component state
interface ComponentState {
  emulatorId: string; // Selected emulator Id
}

// Configure emulator component
export class ConfigureEmulator extends React.PureComponent<ComponentProperties, ComponentState> {
  constructor (props: ComponentProperties) {
    super(props)

    this.state = {
      emulatorId: this.props.match.params.emulatorId as string || 'mame'
    }
  }

  public render (): React.ReactNode {
    return (
      <div className="ConfigureEmulator">
        Configure {this.state.emulatorId} emulator
        <Button color="secondary" component={Link} to={{ pathname: `/add-emulator/${this.state.emulatorId}` }}>Back</Button>
        <Button color="primary" component={Link} to="/create-emulator/">Confirm</Button>
      </div>
    )
  }
}
