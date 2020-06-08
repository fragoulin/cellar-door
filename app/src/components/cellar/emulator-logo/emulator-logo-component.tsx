import './emulator-logo.scss'
import React from 'react'
import { Emulator } from 'models/emulator/types'

/**
 * Properties definition for this component.
 */
export interface EmulatorLogoComponentStateProperties {
  emulator: Emulator
}

/**
 * Displays emulator logo if available.
 * If emulator has no logo, displays its name.
 */
class EmulatorLogoComponent extends React.PureComponent<
  EmulatorLogoComponentStateProperties
> {
  /**
   * Render title and the list of emulators.
   *
   * @returns the newly created node.
   */
  public render(): React.ReactNode {
    return (
      <>
        {this.props.emulator.logo ? (
          <img
            className="logo"
            role="link"
            src={this.props.emulator.logo}
            alt={this.props.emulator.shortName}
            draggable={false}
          />
        ) : (
          <span className="text" role="link">
            {this.props.emulator.shortName}
          </span>
        )}
      </>
    )
  }
}

export default EmulatorLogoComponent
