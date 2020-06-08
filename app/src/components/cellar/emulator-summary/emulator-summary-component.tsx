import React from 'react'
import { Emulator } from 'models/emulator/types'
import EmulatorConfigurationSummary from 'components/emulator/configuration/emulator-configuration-summary/emulator-configuration-summary-component'
import { withTranslation, WithTranslation } from 'react-i18next'

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
class EmulatorSummary extends React.PureComponent<
  EmulatorSummaryComponentProperties & WithTranslation
> {
  /**
   * Render title and a summary of emulator configuration.
   *
   * @returns the newly created node.
   */
  public render(): React.ReactNode {
    return (
      <>
        <h2>{this.props.emulator.shortName}</h2>
        <EmulatorConfigurationSummary
          configuration={this.props.emulator.configuration}
        />
      </>
    )
  }
}

export default withTranslation()(EmulatorSummary)
