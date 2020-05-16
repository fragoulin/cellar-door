import { connect } from 'react-redux'
import { RootState } from '../../redux/store'
import { EmulatorsSelect, EmulatorsSelectComponentStateProperties, EmulatorSelectComponentDispatchProperties } from '../../components/emulator/configuration/emulators-select/emulators-select-component'
import { EmulatorId } from '../../models/emulator/emulator'
import { ActionsWithPayload } from '../../redux'
import { SET_SELECTED_EMULATOR_ID, EmulatorsActions } from '../../redux/modules/emulators'

const mapStateToProps = (state: RootState): EmulatorsSelectComponentStateProperties => {
  return {
    availableEmulatorNames: state.emulators.availableEmulatorNames,
    hasError: state.emulators.wizard.hasError
  }
}

const mapDispatchToProps: EmulatorSelectComponentDispatchProperties = {
  setSelectedEmulatorId: (emulatorId: EmulatorId): ActionsWithPayload<typeof SET_SELECTED_EMULATOR_ID, EmulatorId> => EmulatorsActions.setSelectedEmulatorId(emulatorId)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmulatorsSelect)
