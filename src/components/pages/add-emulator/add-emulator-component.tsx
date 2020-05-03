import './add-emulator.css'
import * as React from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { EmulatorsSelect } from '../../organisms/emulators-select/emulators-select-component'

// Interface for component state
interface ComponentState {
  selectedEmulatorId: string;
  nextButtonDisabled: boolean;
}

// Add emulator (step1) page
export class AddEmulator extends React.PureComponent<{}, ComponentState> {
  constructor (props: {}) {
    super(props)

    this.state = {
      selectedEmulatorId: '',
      nextButtonDisabled: true
    }
  }

  setEmulator = (emulatorId: string): void => {
    this.setState({
      nextButtonDisabled: false
    })
    this.setState({ selectedEmulatorId: emulatorId })
  }

  public render (): React.ReactNode {
    return (
      <div className="AddEmulator">
        <h1>Add an emulator</h1>
        <p>Choose an emulator from the following list</p>
        <div>
          <EmulatorsSelect setEmulator={this.setEmulator}/>
        </div>
        <Button color="secondary" component={Link} to="/">Back</Button>
        <Button color="primary" disabled={this.state.nextButtonDisabled} component={Link} to={{ pathname: `/configure-emulator/${this.state.selectedEmulatorId}` }}>Next</Button>
      </div>
    )
  }
}
