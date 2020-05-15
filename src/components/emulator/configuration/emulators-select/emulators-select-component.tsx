import './emulators-select.css'
import * as React from 'react'
import { Select, InputLabel, FormHelperText } from '@material-ui/core'
import { EmulatorId } from '../../../../models/emulator/emulator'
import { List } from 'immutable'
import { EmulatorIdsToName } from '../../../../store/emulators/types'
import { FormattedMessage } from 'react-intl'

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
        <InputLabel htmlFor="emulator"><FormattedMessage id="emulator-select.label"/></InputLabel>
        <Select
          native
          name="emulator"
          className="EmulatorsList"
          value={this.state.selectedEmulatorId}
          onChange={this.handleChange}
        >
          <option aria-label="None" value="" />
          {this.props.availableEmulatorNames.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
        </Select>
        {this.props.hasError && <FormHelperText><FormattedMessage id="emulator-select.error-required"/></FormHelperText>}
      </div>
    )
  }
}