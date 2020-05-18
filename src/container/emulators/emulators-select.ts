import { connect } from 'react-redux'
import { RootState } from '../../redux/store'
import { EmulatorsSelect, EmulatorsSelectComponentStateProperties, EmulatorSelectComponentDispatchProperties } from '../../components/emulator/configuration/emulators-select/emulators-select-component'
import { EmulatorId } from '../../models/emulator/types'
import { selectedEmulatorIdSet } from '../../redux/modules/emulators'

const mapStateToProps = (state: RootState): EmulatorsSelectComponentStateProperties => {
  return {
    availableEmulatorNames: state.emulators.availableEmulatorNames,
    hasError: state.emulators.wizard.hasError
  }
}

const mapDispatchToProps: EmulatorSelectComponentDispatchProperties = {
  setSelectedEmulatorId: (emulatorId: EmulatorId) => selectedEmulatorIdSet(emulatorId)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmulatorsSelect)
