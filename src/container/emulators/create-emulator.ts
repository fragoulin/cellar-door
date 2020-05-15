import { connect } from 'react-redux'
import { RootState } from '../../store/store'
import { CreateEmulatorComponentStateProperties, CreateEmulator, CreateEmulatorComponentDispatchProperties } from '../../components/emulator/creation/create-emulator/create-emulator-component'
import { Emulator } from '../../models/emulator/emulator'
import { EmulatorsActionTypes } from '../../store/emulators/types'
import { addEmulatorToCellar } from '../../store/emulators/actions'

const mapStateToProps = (state: RootState): CreateEmulatorComponentStateProperties => {
  return {
    emulator: state.emulators.wizard.emulatorCurrentlyConfigured
  }
}

const mapDispatchToProps: CreateEmulatorComponentDispatchProperties = {
  addEmulatorToCellar: (emulator: Emulator): EmulatorsActionTypes => addEmulatorToCellar(emulator)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateEmulator)
