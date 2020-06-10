import './emulators-select.scss'
import * as React from 'react'
import { Select, InputLabel, FormHelperText } from '@material-ui/core'
import { EmulatorId } from 'models/emulator/types'
import { EmulatorIdsToName } from 'redux/modules/cellar'
import { withTranslation, WithTranslation } from 'react-i18next'
import { useState } from 'react'

/**
 * Properties definition for this component.
 */
export type EmulatorSelectComponentProperties = {
  hasError: boolean
  errorMessage?: string
  onEmulatorSelected: (emulatorId: EmulatorId) => void
  selectedEmulatorId?: EmulatorId
}

/**
 * Properties definition for this component (from redux state).
 */
export type EmulatorsSelectComponentStateProperties = {
  availableEmulatorNames: EmulatorIdsToName[]
}

/**
 * Emulators select component displays a list of selectable emulators.
 */
function EmulatorsSelect(
  props: EmulatorSelectComponentProperties &
    EmulatorsSelectComponentStateProperties &
    WithTranslation
): React.ReactElement {
  const [selectedEmulatorId, setSelectedEmulatorId] = useState('')

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    const emulatorId = event.target.value as EmulatorId
    setSelectedEmulatorId(emulatorId)
    props.onEmulatorSelected(emulatorId)
  }

  return (
    <>
      <InputLabel htmlFor="emulator">
        {props.t('emulatorSelect.label')}
      </InputLabel>
      <Select
        native
        name="emulator"
        className="emulators-list"
        value={selectedEmulatorId}
        onChange={handleChange}
      >
        <option aria-label="None" value="" />
        {props.availableEmulatorNames.map((e) => (
          <option key={e.id} value={e.id}>
            {e.name}
          </option>
        ))}
      </Select>
      {props.hasError && <FormHelperText>{props.errorMessage}</FormHelperText>}
    </>
  )
}

export default withTranslation()(EmulatorsSelect)
