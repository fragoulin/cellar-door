import './add-emulator.css'
import * as React from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { EmulatorsSelect } from '../../organisms/emulators-select/emulators-select-component'
import { EmulatorId } from '../../../models/emulator'

interface Emulator {
  emulator: EmulatorId;
}

// Add emulator (step1) page
export class AddEmulator extends React.PureComponent<{}, Emulator> {
  constructor (props: {}) {
    super(props)

    this.state = {
      emulator: EmulatorId.MAME
    }
  }

  setEmulator = (emulator: EmulatorId): void => {
    this.setState({ emulator: emulator })
  }

  public render (): React.ReactNode {
    return (
      <div className="AddEmulator">
        <h1>Add an emulator</h1>
        <p>Choose an emulator from the following list</p>
        <div>
          <EmulatorsSelect emulator={this.state.emulator} setEmulator={this.setEmulator}/>
        </div>
        <Button color="secondary" component={Link} to="/">Back</Button>
        <Button color="primary" component={Link} to={{ pathname: `/configure-emulator/${this.state.emulator}` }}>Next</Button>
      </div>
    )
  }
}
