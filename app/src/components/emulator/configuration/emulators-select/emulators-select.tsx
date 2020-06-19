import * as React from 'react'
import { Select, InputLabel, FormHelperText } from '@material-ui/core'
import { EmulatorId } from 'models/emulator/types'
import { withTranslation, WithTranslation } from 'react-i18next'
import { useState } from 'react'
import useStyles from './emulator-select-styles'
import { useStore } from 'react-redux'
import { RootState } from 'redux/store'

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
 * Emulators select component displays a list of selectable emulators.
 */
function EmulatorsSelect(
  props: EmulatorSelectComponentProperties & WithTranslation
): React.ReactElement {
  const classes = useStyles()
  const store = useStore()
  const state = store.getState() as RootState

  const [selectedEmulatorId, setSelectedEmulatorId] = useState(
    props.selectedEmulatorId ? props.selectedEmulatorId : ''
  )

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
        className={classes.emulatorsList}
        value={selectedEmulatorId}
        onChange={handleChange}
      >
        <option aria-label="None" value="" />
        {state.cellar.present.availableEmulatorNames.map((e) => (
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
