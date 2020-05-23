import React from 'react'
import { Emulator } from '../../../models/emulator/types'
import { EmulatorConfigurationSummary } from '../../emulator/configuration/emulator-configuration-summary/emulator-configuration-summary'

/**
 * Properties definition for this component.
 */
export interface EmulatorSummaryComponentProperties {
  emulator: Emulator
}

/**
 * Emulator summary component renders a summary of an emulator.
 *
 * @see {@link EmulatorConfigurationSummary}
 */
export class EmulatorSummary extends React.PureComponent<
  EmulatorSummaryComponentProperties
> {
  /**
   * Render title and a summary of emulator configurations.
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
