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
 * Emulator summary component displays a summary of the specified emulator.
 */
function EmulatorSummary(
  props: EmulatorSummaryComponentProperties & WithTranslation
): React.ReactElement {
  return (
    <>
      <EmulatorConfigurationSummary
        configuration={props.emulator.configuration}
      />
    </>
  )
}

export default withTranslation()(EmulatorSummary)
