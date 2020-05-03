import './emulators-select.css'
import * as React from 'react'
import { Select, MenuItem, InputLabel, FormControl } from '@material-ui/core'
import { Emulator } from '../../../models/emulator'
import { EmulatorsService } from '../../../services/emulators-service'
import { List } from 'immutable'

// Interface for component properties
interface ComponentProperties {
  setEmulator: Function; // The callback to set selected emulator
}

// Interface for component state
interface ComponentState {
  emulatorsService: EmulatorsService;
  selectedEmulatorId: string;
  emulators: List<Emulator>;
}

// Emulators select
export class EmulatorsSelect extends React.PureComponent<ComponentProperties, ComponentState> {
  constructor (props: ComponentProperties) {
    super(props)

    const service = EmulatorsService.getInstance()

    this.state = {
      emulatorsService: service,
      emulators: service.getEmulators(),
      selectedEmulatorId: ''
    }
  }

  private handleChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    const emulatorId = event.target.value as string

    // Update component state
    this.setState({
      selectedEmulatorId: emulatorId
    })

    // Update selected emulator via callback
    this.props.setEmulator(emulatorId)
  }

  public render (): React.ReactNode {
    return (
      <FormControl required>
        <InputLabel>Emulator</InputLabel>
        <Select
          className="EmulatorsList"
          value={this.state.selectedEmulatorId}
          onChange={this.handleChange}
        >
          {this.state.emulators.map((e: Emulator) => <MenuItem key={e.Id} value={e.Id}>{e.shortName}</MenuItem>)}
        </Select>
      </FormControl>
    )
  }
}
