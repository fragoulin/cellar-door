import React, { useEffect } from 'react'
import { Emulator } from 'models/emulator/types'
import EmulatorSummary from 'components/emulator/creation/emulator-summary/emulator-summary'
import { withTranslation, WithTranslation } from 'react-i18next'
import useStyles from './emulator-created-styles'
import { useStore } from 'react-redux'
import { emulatorAddedToCellar } from 'redux/modules/cellar'

/**
 * Properties definition for this component.
 */
type EmulatorCreatedComponentProperties = {
  emulator: Emulator | undefined
}

/**
 * Create emulator component is the result page after an emulator has been created.
 */
function EmulatorCreated(
  props: EmulatorCreatedComponentProperties & WithTranslation
): React.ReactElement {
  const classes = useStyles()
  const store = useStore()

  /**
   * Add emulator to cellar.
   */
  useEffect(() => {
    if (props.emulator) {
      console.log('DISPATCH (emulator created)')
      store.dispatch(emulatorAddedToCellar(props.emulator))
    }
  })

  if (!props.emulator) return <div>No emulator found</div>

  return (
    <div className={classes.createEmulatorMain}>
      <div>
        <h1>
          {props.t('emulatorCreated.title', {
            name: props.emulator.shortName,
          })}
        </h1>
        <EmulatorSummary emulator={props.emulator} />
      </div>
    </div>
  )
}

export default withTranslation()(EmulatorCreated)
