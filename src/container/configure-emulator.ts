import { connect } from 'react-redux'
import { RootState } from '../store/store'
import { ConfigureEmulator, ConfigureEmulatorComponentStateProperties, ConfigureEmulatorComponentDispatchProperties } from '../components/configure-emulator/configure-emulator-component'
import { EmulatorsActionTypes } from '../store/emulators/types'
import { setWizardStatus, updateEmulatorConfiguration, addEmulatorToCellar } from '../store/emulators/actions'
import { EmulatorConfiguration } from '../models/emulator/emulator-configuration'
import { List } from 'immutable'
import { Emulator } from '../models/emulator/emulator'

const mapStateToProps = (state: RootState): ConfigureEmulatorComponentStateProperties => {
  return {
    emulator: state.emulators.wizard.emulatorCurrentlyConfigured,
    hasError: state.emulators.wizard.hasError
  }
}

const mapDispatchToProps: ConfigureEmulatorComponentDispatchProperties = {
  setWizardStatus: (error: boolean): EmulatorsActionTypes => setWizardStatus(error),
  updateEmulatorConfiguration: (configurations: List<EmulatorConfiguration>): EmulatorsActionTypes => updateEmulatorConfiguration(configurations),
  addEmulatorToCellar: (emulator: Emulator): EmulatorsActionTypes => addEmulatorToCellar(emulator)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigureEmulator)
