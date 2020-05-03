import './configure-emulator.css'
import React from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { Emulator, EmulatorId } from 'src/models/emulator/emulator'
import { EmulatorsService } from '../../services/emulators-service'

// Custom type to access to route parameters
type ComponentProperties = RouteComponentProps<{ emulatorId?: string }>

// Interface for component state
interface ComponentState {
  emulator?: Emulator; // Selected emulator
  nextButtonDisabled: boolean;
}

// Configure emulator component
export class ConfigureEmulator extends React.PureComponent<ComponentProperties, ComponentState> {
  constructor (props: ComponentProperties) {
    super(props)

    const service = EmulatorsService.getInstance()
    const emulatorId = this.props.match.params.emulatorId || ''
    console.log(emulatorId, 'id')
    this.state = {
      emulator: service.getEmulator(emulatorId as unknown as EmulatorId),
      nextButtonDisabled: true
    }
  }

  public render (): React.ReactNode {
    return (
      this.state.emulator ? (
        <div className="ConfigureEmulator">
          <h1>Configure {this.state.emulator.shortName} emulator</h1>
          <Button color="secondary" component={Link} to="/add-emulator/">Back</Button>
          <Button color="primary" disabled={this.state.nextButtonDisabled} component={Link} to="/create-emulator/">Confirm</Button>
        </div>
      )
        : <div>Emulator not found</div>
    )
  }
}
