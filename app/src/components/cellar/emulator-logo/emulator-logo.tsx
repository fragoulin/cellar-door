import React from 'react'
import { Emulator } from 'models/emulator/types'
import useStyles from './emulator-logo-styles'

/**
 * Properties definition for this component.
 */
export type EmulatorLogoComponentStateProperties = {
  emulator: Emulator
}

/**
 * Displays emulator logo if available.
 * If emulator has no logo, displays its name.
 */
function EmulatorLogoComponent(
  props: EmulatorLogoComponentStateProperties
): React.ReactElement {
  const classes = useStyles()

  return (
    <>
      {props.emulator.logo ? (
        <img
          className={classes.logo}
          role="link"
          src={props.emulator.logo}
          alt={props.emulator.shortName}
          draggable={false}
        />
      ) : (
        <span className={classes.text} role="link">
          {props.emulator.shortName}
        </span>
      )}
    </>
  )
}

export default EmulatorLogoComponent
