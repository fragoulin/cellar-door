import { connect } from 'react-redux'
import AddEmulator, {
  AddEmulatorComponentStateProperties,
  AddEmulatorComponentDispatchProperties,
} from 'app/src/components/emulator/creation/add-emulator/add-emulator-component'
import { RootState } from 'app/src/redux/store'
import { EmulatorId } from 'app/src/models/emulator/types'
import {
  availableEmulatorNamesListBuilt,
  wizardStatusSet,
  emulatorCreated,
} from 'app/src/redux/modules/emulators'

/**
 * Provides part of redux state to component properties.
 *
 * @param state - redux root state.
 */
const mapStateToProps = (
  state: RootState
): AddEmulatorComponentStateProperties => {
  return {
    selectedEmulatorId: state.emulators.wizard.selectedEmulatorId,
    hasError: state.emulators.wizard.hasError,
  }
}

/**
 * Dispatch some functions to component properties.
 */
const mapDispatchToProps: AddEmulatorComponentDispatchProperties = {
  buildAvailableEmulatorNamesList: () => availableEmulatorNamesListBuilt(),
  setWizardStatus: (error: boolean) => wizardStatusSet(error),
  createEmulator: (emulatorId: EmulatorId) => emulatorCreated(emulatorId),
}

/**
 * Connect this container to the component.
 */
export default connect(mapStateToProps, mapDispatchToProps)(AddEmulator)
