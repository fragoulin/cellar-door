import { connect } from 'react-redux'
import { AddEmulator, AddEmulatorComponentStateProperties, AddEmulatorComponentDispatchProperties } from '../../components/emulator/creation/add-emulator/add-emulator-component'
import { RootState } from '../../redux/store'
import { EmulatorId } from '../../models/emulator/emulator'
import { buildAvailableEmulatorNamesList, setWizardStatus, createEmulator } from '../../redux/modules/emulators'

const mapStateToProps = (state: RootState): AddEmulatorComponentStateProperties => {
  return {
    selectedEmulatorId: state.emulators.wizard.selectedEmulatorId,
    hasError: state.emulators.wizard.hasError
  }
}

const mapDispatchToProps: AddEmulatorComponentDispatchProperties = {
  buildAvailableEmulatorNamesList: () => buildAvailableEmulatorNamesList(),
  setWizardStatus: (error: boolean) => setWizardStatus(error),
  createEmulator: (emulatorId: EmulatorId) => createEmulator(emulatorId)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEmulator)
