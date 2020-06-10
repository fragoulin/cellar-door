import React from 'react'
import { Emulator } from 'models/emulator/types'
import EmulatorConfigurationSummary from 'components/emulator/configuration/emulator-configuration-summary/emulator-configuration-summary'
import { withTranslation, WithTranslation } from 'react-i18next'

/**
 * Properties definition for this component.
 */
export type EmulatorSummaryComponentProperties = {
  emulator: Emulator
}

/**
 * Emulator summary component renders a summary of an emulator.
 *
 * @see {@link EmulatorConfigurationSummary}
 */
function EmulatorSummary(
  props: EmulatorSummaryComponentProperties & WithTranslation
): React.ReactElement {
  return (
    <>
      <h2>{props.emulator.shortName}</h2>
      <EmulatorConfigurationSummary
        configuration={props.emulator.configuration}
      />
    </>
  )
}

export default withTranslation()(EmulatorSummary)
