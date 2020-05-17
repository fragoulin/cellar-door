import { connect } from 'react-redux'
import { RootState } from '../../redux/store'
import { CreateEmulatorComponentStateProperties, CreateEmulator, CreateEmulatorComponentDispatchProperties } from '../../components/emulator/creation/create-emulator/create-emulator-component'
import { Emulator } from '../../models/emulator/emulator'
import { addEmulatorToCellar } from '../../redux/modules/emulators'

const mapStateToProps = (state: RootState): CreateEmulatorComponentStateProperties => {
  return {
    emulator: state.emulators.wizard.emulatorCurrentlyConfigured
  }
}

const mapDispatchToProps: CreateEmulatorComponentDispatchProperties = {
  addEmulatorToCellar: (emulator: Emulator) => addEmulatorToCellar(emulator)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateEmulator)
