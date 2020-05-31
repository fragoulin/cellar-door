import { connect } from 'react-redux'
import { RootState } from 'app/src/redux/store'
import ConfigureEmulator, {
  ConfigureEmulatorComponentStateProperties,
  ConfigureEmulatorComponentDispatchProperties,
} from 'app/src/components/emulator/configuration/configure-emulator/configure-emulator-component'
import { EmulatorConfiguration } from 'app/src/models/emulator/types'
import {
  wizardStatusSet,
  emulatorConfigurationUpdated,
} from 'app/src/redux/modules/emulators'

/**
 * Provides part of redux state to component properties.
 *
 * @param state - redux root state.
 */
const mapStateToProps = (
  state: RootState
): ConfigureEmulatorComponentStateProperties => {
  return {
    emulator: state.emulators.wizard.emulatorCurrentlyConfigured,
    hasError: state.emulators.wizard.hasError,
  }
}

/**
 * Dispatch some functions to component properties.
 */
const mapDispatchToProps: ConfigureEmulatorComponentDispatchProperties = {
  setWizardStatus: (error: boolean) => wizardStatusSet(error),
  updateEmulatorConfiguration: (configurations: EmulatorConfiguration[]) =>
    emulatorConfigurationUpdated(configurations),
}

/**
 * Connect this container to the component.
 */
export default connect(mapStateToProps, mapDispatchToProps)(ConfigureEmulator)
