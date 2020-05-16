import { connect } from 'react-redux'
import { AddEmulator, AddEmulatorComponentStateProperties, AddEmulatorComponentDispatchProperties } from '../../components/emulator/creation/add-emulator/add-emulator-component'
import { RootState } from '../../redux/store'
import { EmulatorId } from '../../models/emulator/emulator'
import { ActionsWithoutPayload, ActionsWithPayload } from '../../redux'
import { BUILD_AVAILABLE_EMULATOR_NAMES_LIST, EmulatorsActions, SET_WIZARD_STATUS, CREATE_EMULATOR } from '../../redux/modules/emulators'

const mapStateToProps = (state: RootState): AddEmulatorComponentStateProperties => {
  return {
    selectedEmulatorId: state.emulators.wizard.selectedEmulatorId,
    hasError: state.emulators.wizard.hasError
  }
}

const mapDispatchToProps: AddEmulatorComponentDispatchProperties = {
  buildAvailableEmulatorNamesList: (): ActionsWithoutPayload<typeof BUILD_AVAILABLE_EMULATOR_NAMES_LIST> => EmulatorsActions.buildAvailableEmulatorNamesList(),
  setWizardStatus: (error: boolean): ActionsWithPayload<typeof SET_WIZARD_STATUS, boolean> => EmulatorsActions.setWizardStatus(error),
  createEmulator: (emulatorId: EmulatorId): ActionsWithPayload<typeof CREATE_EMULATOR, EmulatorId> => EmulatorsActions.createEmulator(emulatorId)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEmulator)
