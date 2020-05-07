import { connect } from 'react-redux'
import { RootState } from '../store/store'
import { EmulatorsSelect, EmulatorsSelectComponentStateProperties, EmulatorSelectComponentDispatchProperties } from '../components/emulators-select/emulators-select-component'
import { EmulatorsActionTypes } from '../store/emulators/types'
import { setSelectedEmulatorId } from '../store/emulators/actions'
import { EmulatorId } from '../models/emulator/emulator'

const mapStateToProps = (state: RootState): EmulatorsSelectComponentStateProperties => {
  return {
    availableEmulatorNames: state.emulators.availableEmulatorNames,
    hasError: state.emulators.wizard.hasError
  }
}

const mapDispatchToProps: EmulatorSelectComponentDispatchProperties = {
  setSelectedEmulatorId: (emulatorId: EmulatorId): EmulatorsActionTypes => setSelectedEmulatorId(emulatorId)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmulatorsSelect)
