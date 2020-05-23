import React from 'react'
import { Emulator } from '../../../../models/emulator/types'
import { EmulatorConfigurationSummary } from '../../configuration/emulator-configuration-summary/emulator-configuration-summary'

/**
 * Properties definition for this component.
 */
export interface EmulatorSummaryComponentProperties {
  emulator: Emulator
}

/**
 * Emulator summary component displays a summary of the specified emulator.
 */
export class EmulatorSummary extends React.PureComponent<
  EmulatorSummaryComponentProperties
> {
  /**
   * Render title and configurations from specified emulator.
   *
   * @returns the newly created node.
   */
  public render(): React.ReactNode {
    return (
      <>
        <h2>{this.props.emulator.shortName}</h2>
        <EmulatorConfigurationSummary
          configurations={this.props.emulator.configurations}
        />
      </>
    )
  }
}
