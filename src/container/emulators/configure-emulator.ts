import { connect } from 'react-redux'
import { RootState } from '../../redux/store'
import { ConfigureEmulator, ConfigureEmulatorComponentStateProperties, ConfigureEmulatorComponentDispatchProperties } from '../../components/emulator/configuration/configure-emulator/configure-emulator-component'
import { EmulatorConfiguration } from '../../models/emulator/emulator'
import { setWizardStatus, updateEmulatorConfiguration } from '../../redux/modules/emulators'

const mapStateToProps = (state: RootState): ConfigureEmulatorComponentStateProperties => {
  return {
    emulator: state.emulators.wizard.emulatorCurrentlyConfigured,
    hasError: state.emulators.wizard.hasError
  }
}

const mapDispatchToProps: ConfigureEmulatorComponentDispatchProperties = {
  setWizardStatus: (error: boolean) => setWizardStatus(error),
  updateEmulatorConfiguration: (configurations: EmulatorConfiguration[]) => updateEmulatorConfiguration(configurations)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigureEmulator)
