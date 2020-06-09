import './add-emulator.scss'
import * as React from 'react'
import { FormControl } from '@material-ui/core'
import EmulatorsSelect from 'container/emulators/emulators-select'
import { EmulatorId, Emulator } from 'models/emulator/types'
import { withTranslation, WithTranslation } from 'react-i18next'

/**
 * Properties definition for this component (from redux state).
 */
export interface AddEmulatorComponentStateProperties {
  emulatorsInCellar: Emulator[]
}

/**
 * Properties definition for this component.
 */
interface AddEmulatorComponentProperties {
  onSelectedEmulatorId: (emulatorId: EmulatorId) => void
  onError: (hasError: boolean, message?: string) => void
  selectedEmulatorId?: EmulatorId
}

/**
 * State definition for this component.
 */
interface AddEmulatorComponentState {
  hasError: boolean
  errorMessage?: string
}

/**
 * Add emulator component is the first step of the configuration of an emulator.
 * It displays the list of available emulators and back/submit buttons.
 */
class AddEmulator extends React.PureComponent<
  AddEmulatorComponentProperties &
    AddEmulatorComponentStateProperties &
    WithTranslation,
  AddEmulatorComponentState
> {
  /**
   * Initialize component state.
   *
   * @param props - component properties.
   */
  constructor(
    props: AddEmulatorComponentProperties &
      AddEmulatorComponentStateProperties &
      WithTranslation
  ) {
    super(props)

    this.state = {
      hasError: false,
    }
  }

  /**
   * Check if emulator Id is already configured in cellar.
   *
   * @param emulatorId - emulator Id to verify.
   * @returns true if emulator Id is part of cellar, otherwise false.
   */
  private isEmulatorAlreadyPresentInCellar(emulatorId: EmulatorId): boolean {
    return !!this.props.emulatorsInCellar.find(
      (emulator) => emulatorId === emulator.Id
    )
  }

  /**
   * Handle emulator selection from child component.
   *
   * @param emulatorId - selected emulator Id.
   */
  private handleEmulatorSelection = (emulatorId: EmulatorId): void => {
    let errorMessage: string | undefined

    // Check if an emulator has been selected
    const emulatorIdDefined =
      emulatorId !== undefined && emulatorId !== EmulatorId.Unknown
    if (!emulatorIdDefined)
      errorMessage = this.props.t('emulatorSelect.errorRequired')

    // Check if emulator is already configured
    const emulatorAlreadyConfigured = this.isEmulatorAlreadyPresentInCellar(
      emulatorId
    )
    if (emulatorAlreadyConfigured)
      errorMessage = this.props.t('emulatorSelect.errorAlreadyConfigured')

    // Form is in error is no emulator has been selected or if selected emulator is already configured
    const error = !emulatorIdDefined || emulatorAlreadyConfigured

    this.setState({
      hasError: error,
      errorMessage: errorMessage,
    })

    this.props.onSelectedEmulatorId(emulatorId)
    this.props.onError(error, errorMessage)
  }

  /**
   * Renders emulators select component inside a form and control buttons.
   * If an emulator is selected and confirmed, redirect to configure emulator component.
   *
   * @returns the newly created node.
   */
  public render(): React.ReactNode {
    return (
      <form className="add-emulator">
        <span>{this.props.t('addEmulator.text')}</span>
        <div>
          <FormControl required error={this.state.hasError}>
            <EmulatorsSelect
              selectedEmulatorId={this.props.selectedEmulatorId}
              hasError={this.state.hasError}
              errorMessage={this.state.errorMessage}
              onEmulatorSelected={this.handleEmulatorSelection}
            />
          </FormControl>
        </div>
      </form>
    )
  }
}

export default withTranslation()(AddEmulator)
