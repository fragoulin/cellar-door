import * as React from 'react'
import { FormControl } from '@material-ui/core'
import EmulatorsSelect from 'container/emulators/emulators-select'
import { EmulatorId, Emulator } from 'models/emulator/types'
import { withTranslation, WithTranslation } from 'react-i18next'
import { useState } from 'react'
import useStyles from './add-emulator-styles'

/**
 * Properties definition for this component (from redux state).
 */
export type AddEmulatorComponentStateProperties = {
  emulatorsInCellar: Emulator[]
}

/**
 * Properties definition for this component.
 */
type AddEmulatorComponentProperties = {
  onSelectedEmulatorId: (emulatorId: EmulatorId) => void
  onError: (hasError: boolean, message?: string) => void
  selectedEmulatorId?: EmulatorId
}

/**
 * Add emulator component is the first step of the configuration of an emulator.
 * It displays the list of available emulators and back/submit buttons.
 */
function AddEmulator(
  props: AddEmulatorComponentProperties &
    AddEmulatorComponentStateProperties &
    WithTranslation
): React.ReactElement {
  const classes = useStyles()
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )

  /**
   * Check if emulator Id is already configured in cellar.
   *
   * @param emulatorId - emulator Id to verify.
   * @returns true if emulator Id is part of cellar, otherwise false.
   */
  const isEmulatorAlreadyPresentInCellar = (
    emulatorId: EmulatorId
  ): boolean => {
    return !!props.emulatorsInCellar.find(
      (emulator) => emulatorId === emulator.Id
    )
  }

  /**
   * Handle emulator selection from child component.
   *
   * @param emulatorId - selected emulator Id.
   */
  const handleEmulatorSelection = (emulatorId: EmulatorId): void => {
    let errorMessage: string | undefined

    // Check if an emulator has been selected
    const emulatorIdDefined =
      emulatorId !== undefined && emulatorId !== EmulatorId.Unknown
    if (!emulatorIdDefined)
      errorMessage = props.t('emulatorSelect.errorRequired')

    // Check if emulator is already configured
    const emulatorAlreadyConfigured = isEmulatorAlreadyPresentInCellar(
      emulatorId
    )
    if (emulatorAlreadyConfigured)
      errorMessage = props.t('emulatorSelect.errorAlreadyConfigured')

    // Form is in error is no emulator has been selected or if selected emulator is already configured
    const error = !emulatorIdDefined || emulatorAlreadyConfigured

    setHasError(error)
    setErrorMessage(errorMessage)

    props.onSelectedEmulatorId(emulatorId)
    props.onError(error, errorMessage)
  }

  return (
    <form className={classes.addEmulatorMain}>
      <span>{props.t('addEmulator.text')}</span>
      <div>
        <FormControl required error={hasError}>
          <EmulatorsSelect
            selectedEmulatorId={props.selectedEmulatorId}
            hasError={hasError}
            errorMessage={errorMessage}
            onEmulatorSelected={handleEmulatorSelection}
          />
        </FormControl>
      </div>
    </form>
  )
}

export default withTranslation()(AddEmulator)
