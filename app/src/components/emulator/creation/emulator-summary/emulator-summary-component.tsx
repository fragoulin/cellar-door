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
 * Emulator summary component displays a summary of the specified emulator.
 */
class EmulatorSummary extends React.PureComponent<
  EmulatorSummaryComponentProperties & WithTranslation
> {
  /**
   * Render title and configuration from specified emulator.
   *
   * @returns the newly created node.
   */
  public render(): React.ReactNode {
    return (
      <>
        <EmulatorConfigurationSummary
          configuration={this.props.emulator.configuration}
        />
      </>
    )
  }
}

export default withTranslation()(EmulatorSummary)
