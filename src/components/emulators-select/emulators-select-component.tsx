import './emulators-select.css'
import * as React from 'react'
import { Select, MenuItem, InputLabel, FormControl, FormHelperText } from '@material-ui/core'
import { EmulatorId } from '../../models/emulator/emulator'
import { List } from 'immutable'
import { EmulatorIdsToName } from '../../store/emulators/types'

// Interface for component properties
export interface EmulatorsSelectComponentStateProperties {
  availableEmulatorNames: List<EmulatorIdsToName>;
  hasError: boolean;
}

export interface EmulatorSelectComponentDispatchProperties {
  setSelectedEmulatorId: Function;
}

interface EmulatorSelectComponentState {
  selectedEmulatorId: EmulatorId | '';
}

// Emulators select
export class EmulatorsSelect extends React.PureComponent<EmulatorsSelectComponentStateProperties & EmulatorSelectComponentDispatchProperties, EmulatorSelectComponentState> {
  constructor (props: EmulatorsSelectComponentStateProperties & EmulatorSelectComponentDispatchProperties) {
    super(props)

    this.state = {
      selectedEmulatorId: ''
    }
  }

  private handleChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    const emulatorId = event.target.value as EmulatorId
    this.setState({
      selectedEmulatorId: emulatorId
    })

    // Update selected emulator in store
    this.props.setSelectedEmulatorId(emulatorId)
  }

  public render (): React.ReactNode {
    return (
      <div>
        <InputLabel htmlFor="emulator">Emulator</InputLabel>
        <Select
          name="emulator"
          className="EmulatorsList"
          value={this.state.selectedEmulatorId}
          onChange={this.handleChange}
        >
          {this.props.availableEmulatorNames.map(e => <MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>)}
        </Select>
        {this.props.hasError && <FormHelperText>Emulator is required</FormHelperText>}
      </div>
    )
  }
}
