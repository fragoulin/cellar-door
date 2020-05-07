import './add-emulator.css'
import * as React from 'react'
import { Button, FormControl } from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom'
import EmulatorsSelect from '../../../../container/emulators/emulators-select'
import { EmulatorId } from '../../../../models/emulator/emulator'

// Interface for component state properties
export interface AddEmulatorComponentStateProperties {
  selectedEmulatorId: EmulatorId | undefined;
  hasError: boolean;
}

// Interface for component dispatch properties
export interface AddEmulatorComponentDispatchProperties {
  buildAvailableEmulatorNamesList: Function;
  setWizardStatus: Function;
  createEmulator: Function;
}

// Interface for component state
interface AddEmulatorComponentState {
  redirect: boolean;
}

// Add emulator (step1) page
export class AddEmulator extends React.PureComponent<AddEmulatorComponentStateProperties & AddEmulatorComponentDispatchProperties, AddEmulatorComponentState> {
  constructor (props: AddEmulatorComponentStateProperties & AddEmulatorComponentDispatchProperties) {
    super(props)

    props.buildAvailableEmulatorNamesList()

    this.state = {
      redirect: false
    }
  }

  private handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault()

    const emulatorIdDefined = this.props.selectedEmulatorId !== undefined

    // Set wizard state
    this.props.setWizardStatus(!emulatorIdDefined)

    if (emulatorIdDefined) {
      // Create emulator
      this.props.createEmulator(this.props.selectedEmulatorId)
    }

    this.setState({
      redirect: emulatorIdDefined
    })
  }

  public render (): React.ReactNode {
    return (
      !this.state.redirect
        ? <form className="AddEmulator" onSubmit={this.handleSubmit}>
          <h1>Add an emulator</h1>
          <p>Choose an emulator from the following list</p>
          <div>
            <FormControl required error={this.props.hasError}>
              <EmulatorsSelect/>
            </FormControl>
          </div>
          <Button color="secondary" component={Link} to="/">Back</Button>
          <Button color="primary" type="submit">Next</Button>
        </form>
        : <Redirect to="/configure-emulator/" />
    )
  }
}
