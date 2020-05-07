import { connect } from 'react-redux'
import { AddEmulator, AddEmulatorComponentStateProperties, AddEmulatorComponentDispatchProperties } from '../components/add-emulator/add-emulator-component'
import { buildAvailableEmulatorNamesList, setWizardStatus, createEmulator } from '../store/emulators/actions'
import { EmulatorsActionTypes } from '../store/emulators/types'
import { RootState } from '../store/store'
import { EmulatorId } from '../models/emulator/emulator'

const mapStateToProps = (state: RootState): AddEmulatorComponentStateProperties => {
  return {
    selectedEmulatorId: state.emulators.wizard.selectedEmulatorId,
    hasError: state.emulators.wizard.hasError
  }
}

const mapDispatchToProps: AddEmulatorComponentDispatchProperties = {
  buildAvailableEmulatorNamesList: (): EmulatorsActionTypes => buildAvailableEmulatorNamesList(),
  setWizardStatus: (error: boolean): EmulatorsActionTypes => setWizardStatus(error),
  createEmulator: (emulatorId: EmulatorId): EmulatorsActionTypes => createEmulator(emulatorId)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEmulator)
