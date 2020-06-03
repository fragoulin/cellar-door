import './add-emulator.scss'
import * as React from 'react'
import { Button, FormControl } from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom'
import EmulatorsSelect from 'container/emulators/emulators-select'
import { EmulatorId, Emulator } from 'models/emulator/types'
import { withTranslation, WithTranslation } from 'react-i18next'

/**
 * Properties definition for this component (from redux state).
 */
export interface AddEmulatorComponentStateProperties {
  selectedEmulatorId: EmulatorId | undefined
  emulatorsInCellar: Emulator[]
}

/**
 * Properties definition for this component (from redux reducer).
 */
export interface AddEmulatorComponentDispatchProperties {
  buildAvailableEmulatorNamesList(): void
  createEmulator(emulatorId: EmulatorId): void
}

/**
 * State definition for this component.
 */
interface AddEmulatorComponentState {
  redirect: boolean
  hasError: boolean
  errorMessage?: string
}

/**
 * Add emulator component is the first step of the configuration of an emulator.
 * It displays the list of available emulators and back/submit buttons.
 */
class AddEmulator extends React.PureComponent<
  AddEmulatorComponentStateProperties &
    AddEmulatorComponentDispatchProperties &
    WithTranslation,
  AddEmulatorComponentState
> {
  /**
   * Initialize component state.
   *
   * @param props - component properties.
   */
  constructor(
    props: AddEmulatorComponentStateProperties &
      AddEmulatorComponentDispatchProperties &
      WithTranslation
  ) {
    super(props)

    this.state = {
      redirect: false,
      hasError: false,
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

    let errorMessage: string | undefined

    // Check if an emulator has been selected
    const emulatorIdDefined = this.props.selectedEmulatorId !== undefined
    if (!emulatorIdDefined)
      errorMessage = this.props.t('emulatorSelect.errorRequired')

    // Check if emulator is already configured
    const emulatorAlreadyConfigured = this.emulatorAlreadyPresentInCellar()
    if (emulatorAlreadyConfigured)
      errorMessage = this.props.t('emulatorSelect.errorAlreadyConfigured')

    // Form is in error is no emulator has been selected or if selected emulator is already configured
    const error = !emulatorIdDefined || emulatorAlreadyConfigured

    if (!error && this.props.selectedEmulatorId) {
      // Create emulator
      this.props.createEmulator(this.props.selectedEmulatorId)
    }

    this.setState({
      redirect: !error,
      hasError: error,
      errorMessage: errorMessage,
    })
  }

  /**
   * Check if emulator Id is already configured in cellar.
   *
   * @param emulatorId - emulator Id to verify.
   * @returns true if emulator Id is part of cellar, otherwise false.
   */
  private emulatorAlreadyPresentInCellar(): boolean {
    return !!this.props.emulatorsInCellar.find(
      (emulator) => this.props.selectedEmulatorId === emulator.Id
    )
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
        <h1>{this.props.t('addEmulator.title')}</h1>
        <p>{this.props.t('addEmulator.text')}</p>
        <div>
          <FormControl required error={this.state.hasError}>
            <EmulatorsSelect
              hasError={this.state.hasError}
              errorMessage={this.state.errorMessage}
            />
          </FormControl>
        </div>
        <Button color="secondary" component={Link} to="/">
          {this.props.t('common.back')}
        </Button>
        <Button color="primary" type="submit">
          {this.props.t('common.confirm')}
        </Button>
      </form>
    ) : (
      <Redirect to="/configure-emulator/" />
    )
  }
}

export default withTranslation()(AddEmulator)
