import './emulators-select.css'
import * as React from 'react'
import { Select, MenuItem, InputLabel, FormControl } from '@material-ui/core'
import { EmulatorId } from '../../../models/emulator'

// Interface for component init
interface Emulator {
  emulator: EmulatorId; // The default emulator
  setEmulator: Function; // The callback to set selected emulator
}

// Emulators select
export class EmulatorsSelect extends React.PureComponent<{} & Emulator, Emulator> {
  private handleChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    this.props.setEmulator(event.target.value as EmulatorId)
  }

  public render (): React.ReactNode {
    return (
      <FormControl required>
        <InputLabel>Emulator</InputLabel>
        <Select className="EmulatorsList"
          value={this.props.emulator}
          onChange={this.handleChange}
        >
          <MenuItem value={EmulatorId.HyperSpin}>{EmulatorId.HyperSpin}</MenuItem>
          <MenuItem value={EmulatorId.MAME}>{EmulatorId.MAME}</MenuItem>
          <MenuItem value={EmulatorId.Nebula}>{EmulatorId.Nebula}</MenuItem>
          <MenuItem value={EmulatorId.NeoRageX}>{EmulatorId.NeoRageX}</MenuItem>
          <MenuItem value={EmulatorId.ScummVM}>{EmulatorId.ScummVM}</MenuItem>
          <MenuItem value={EmulatorId.ZiNc}>{EmulatorId.ZiNc}</MenuItem>
        </Select>
      </FormControl>
    )
  }
}
