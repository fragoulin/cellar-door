import { connect } from 'react-redux'
import { RootState } from '../../redux/store'
import { CreateEmulatorComponentStateProperties, CreateEmulator, CreateEmulatorComponentDispatchProperties } from '../../components/emulator/creation/create-emulator/create-emulator-component'
import { Emulator } from '../../models/emulator/emulator'
import { ActionsWithPayload } from '../../redux'
import { ADD_EMULATOR_TO_CELLAR, EmulatorsActions } from '../../redux/modules/emulators'

const mapStateToProps = (state: RootState): CreateEmulatorComponentStateProperties => {
  return {
    emulator: state.emulators.wizard.emulatorCurrentlyConfigured
  }
}

const mapDispatchToProps: CreateEmulatorComponentDispatchProperties = {
  addEmulatorToCellar: (emulator: Emulator): ActionsWithPayload<typeof ADD_EMULATOR_TO_CELLAR, Emulator> => EmulatorsActions.addEmulatorToCellar(emulator)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateEmulator)
