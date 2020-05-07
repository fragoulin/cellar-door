import { connect } from 'react-redux'
import { RootState } from '../store/store'
import { CreateEmulatorComponentStateProperties, CreateEmulator } from '../components/create-emulator/create-emulator-component'

const mapStateToProps = (state: RootState): CreateEmulatorComponentStateProperties => {
  return {
    emulator: state.emulators.wizard.emulatorCurrentlyConfigured
  }
}

export default connect(
  mapStateToProps
)(CreateEmulator)
