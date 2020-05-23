import './add-emulator.css'
import * as React from 'react'
import { Button, FormControl } from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom'
import EmulatorsSelect from '../../../../container/emulators/emulators-select'
import { EmulatorId } from '../../../../models/emulator/types'
import { FormattedMessage } from 'react-intl'

/**
 * Properties definition for this component (from redux state).
 */
export interface AddEmulatorComponentStateProperties {
  selectedEmulatorId: EmulatorId | undefined
  hasError: boolean
}

/**
 * Properties definition for this component (from redux reducer).
 */
export interface AddEmulatorComponentDispatchProperties {
  buildAvailableEmulatorNamesList(): void
  setWizardStatus(status: boolean): void
  createEmulator(emulatorId: EmulatorId): void
}

/**
 * State definition for this component.
 */
interface AddEmulatorComponentState {
  redirect: boolean
}

/**
 * Add emulator component is the first step of the configuration of an emulator.
 * It displays the list of available emulators and back/submit buttons.
 */
export class AddEmulator extends React.PureComponent<
  AddEmulatorComponentStateProperties & AddEmulatorComponentDispatchProperties,
  AddEmulatorComponentState
> {
  /**
   * Initialize component state.
   *
   * @param props - component properties.
   */
  constructor(
    props: AddEmulatorComponentStateProperties &
      AddEmulatorComponentDispatchProperties
  ) {
    super(props)

    this.state = {
      redirect: false,
    }
  }

  /**
   * Build available emulators list when component is mounted.
   */
  componentDidMount(): void {
    this.props.buildAvailableEmulatorNamesList()
  }

  private handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault()

    const emulatorIdDefined = this.props.selectedEmulatorId !== undefined

    // Set wizard state
    this.props.setWizardStatus(!emulatorIdDefined)

    if (this.props.selectedEmulatorId) {
      // Create emulator
      this.props.createEmulator(this.props.selectedEmulatorId)
    }

    this.setState({
      redirect: emulatorIdDefined,
    })
  }

  /**
   * Renders emulators select component inside a form and control buttons.
   * If an emulator is selected and confirmed, redirect to configure emulator component.
   *
   * @returns the newly created node.
   */
  public render(): React.ReactNode {
    return !this.state.redirect ? (
      <form className="AddEmulator" onSubmit={this.handleSubmit}>
        <h1>
          <FormattedMessage id="add-emulator.title" />
        </h1>
        <p>
          <FormattedMessage id="add-emulator.text" />
        </p>
        <div>
          <FormControl required error={this.props.hasError}>
            <EmulatorsSelect />
          </FormControl>
        </div>
        <Button color="secondary" component={Link} to="/">
          <FormattedMessage id="common.back" />
        </Button>
        <Button color="primary" type="submit">
          <FormattedMessage id="common.confirm" />
        </Button>
      </form>
    ) : (
      <Redirect to="/configure-emulator/" />
    )
  }
}
