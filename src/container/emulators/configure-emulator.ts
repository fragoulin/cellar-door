import { connect } from 'react-redux'
import { RootState } from '../../redux/store'
import { ConfigureEmulator, ConfigureEmulatorComponentStateProperties, ConfigureEmulatorComponentDispatchProperties } from '../../components/emulator/configuration/configure-emulator/configure-emulator-component'
import { EmulatorConfiguration } from '../../models/emulator/emulator-configuration'
import { List } from 'immutable'
import { ActionsWithPayload } from '../../redux'
import { SET_WIZARD_STATUS, EmulatorsActions, UPDATE_EMULATOR_CONFIGURATION } from '../../redux/modules/emulators'

const mapStateToProps = (state: RootState): ConfigureEmulatorComponentStateProperties => {
  return {
    emulator: state.emulators.wizard.emulatorCurrentlyConfigured,
    hasError: state.emulators.wizard.hasError
  }
}

const mapDispatchToProps: ConfigureEmulatorComponentDispatchProperties = {
  setWizardStatus: (error: boolean): ActionsWithPayload<typeof SET_WIZARD_STATUS, boolean> => EmulatorsActions.setWizardStatus(error),
  updateEmulatorConfiguration: (configurations: List<EmulatorConfiguration>): ActionsWithPayload<typeof UPDATE_EMULATOR_CONFIGURATION, List<EmulatorConfiguration>> => EmulatorsActions.updateEmulatorConfiguration(configurations)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigureEmulator)
