import './emulator-logo.scss'
import React from 'react'
import { Emulator } from 'models/emulator/types'

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
  return (
    <>
      {props.emulator.logo ? (
        <img
          className="logo"
          role="link"
          src={props.emulator.logo}
          alt={props.emulator.shortName}
          draggable={false}
        />
      ) : (
        <span className="text" role="link">
          {props.emulator.shortName}
        </span>
      )}
    </>
  )
}

export default EmulatorLogoComponent
