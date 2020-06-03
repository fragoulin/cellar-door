import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import ConfigureEmulator, {
  ConfigureEmulatorComponentStateProperties,
  ConfigureEmulatorComponentDispatchProperties,
} from 'components/emulator/configuration/configure-emulator/configure-emulator-component'
import { EmulatorConfiguration } from 'models/emulator/types'
import { emulatorConfigurationUpdated } from 'redux/modules/emulators'

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
  }
}

/**
 * Dispatch some functions to component properties.
 */
const mapDispatchToProps: ConfigureEmulatorComponentDispatchProperties = {
  updateEmulatorConfiguration: (configuration: EmulatorConfiguration[]) =>
    emulatorConfigurationUpdated(configuration),
}

/**
 * Connect this container to the component.
 */
export default connect(mapStateToProps, mapDispatchToProps)(ConfigureEmulator)
