import React, { useEffect } from 'react'
import { Emulator } from 'models/emulator/types'
import EmulatorSummary from 'components/emulator/creation/emulator-summary/emulator-summary'
import { withTranslation, WithTranslation } from 'react-i18next'
import useStyles from './create-emulator-styles'

/**
 * Properties definition for this component.
 */
type CreateEmulatorComponentProperties = {
  emulator: Emulator | undefined
}

/**
 * Properties definition from redux.
 */
export type CreateEmulatorComponentDispatchProperties = {
  addEmulatorToCellar: (emulator: Emulator) => void
}

/**
 * Create emulator component is the result page after an emulator has been created.
 */
function CreateEmulator(
  props: CreateEmulatorComponentProperties &
    CreateEmulatorComponentDispatchProperties &
    WithTranslation
): React.ReactElement {
  const classes = useStyles()

  /**
   * Add emulator to cellar.
   */
  useEffect(() => {
    if (props.emulator) {
      props.addEmulatorToCellar(props.emulator)
    }
  })

  if (!props.emulator) return <div>No emulator found</div>

  return (
    <div className={classes.createEmulatorMain}>
      <div>
        <h1>
          {props.t('createEmulator.title', {
            name: props.emulator.shortName,
          })}
        </h1>
        <EmulatorSummary emulator={props.emulator} />
      </div>
    </div>
  )
}

export default withTranslation()(CreateEmulator)
