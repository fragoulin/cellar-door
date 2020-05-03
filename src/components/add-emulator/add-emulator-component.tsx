import './add-emulator.css'
import * as React from 'react'
import { Button, FormControl } from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom'
import { EmulatorsSelect } from '../emulators-select/emulators-select-component'

// Interface for component state
interface ComponentState {
  selectedEmulatorId?: string;
  hasError: boolean;
  redirect: boolean;
}

// Add emulator (step1) page
export class AddEmulator extends React.PureComponent<{}, ComponentState> {
  constructor (props: {}) {
    super(props)

    this.state = {
      hasError: false,
      redirect: false
    }
  }

  private setEmulator = (emulatorId: string): void => {
    this.setState({ selectedEmulatorId: emulatorId })
  }

  private handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault()
    this.setState(state => ({
      hasError: !state.selectedEmulatorId,
      redirect: state.selectedEmulatorId !== undefined
    }))
  }

  public render (): React.ReactNode {
    return (
      !this.state.redirect
        ? <form className="AddEmulator" onSubmit={this.handleSubmit}>
          <h1>Add an emulator</h1>
          <p>Choose an emulator from the following list</p>
          <div>
            <FormControl required error={this.state.hasError}>
              <EmulatorsSelect hasError={this.state.hasError} setEmulator={this.setEmulator}/>
            </FormControl>
          </div>
          <Button color="secondary" component={Link} to="/">Back</Button>
          <Button color="primary" type="submit">Next</Button>
        </form>
        : <Redirect to={{ pathname: `/configure-emulator/${this.state.selectedEmulatorId}` }} />
    )
  }
}
