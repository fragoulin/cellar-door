import { connect } from 'react-redux'
import AddEmulator, {
  AddEmulatorComponentStateProperties,
  AddEmulatorComponentDispatchProperties,
} from 'components/emulator/creation/add-emulator/add-emulator-component'
import { RootState } from 'redux/store'
import { EmulatorId } from 'models/emulator/types'
import {
  availableEmulatorNamesListBuilt,
  emulatorCreated,
} from 'redux/modules/emulators'

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
    emulatorsInCellar: state.cellar.emulatorsInCellar,
  }
}

/**
 * Dispatch some functions to component properties.
 */
const mapDispatchToProps: AddEmulatorComponentDispatchProperties = {
  buildAvailableEmulatorNamesList: () => availableEmulatorNamesListBuilt(),
  createEmulator: (emulatorId: EmulatorId) => emulatorCreated(emulatorId),
}

/**
 * Connect this container to the component.
 */
export default connect(mapStateToProps, mapDispatchToProps)(AddEmulator)
