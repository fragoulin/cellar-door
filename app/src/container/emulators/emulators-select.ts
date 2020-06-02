import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import EmulatorsSelect, {
  EmulatorsSelectComponentStateProperties,
  EmulatorSelectComponentDispatchProperties,
} from 'components/emulator/configuration/emulators-select/emulators-select-component'
import { EmulatorId } from 'models/emulator/types'
import { selectedEmulatorIdSet } from 'redux/modules/emulators'

/**
 * Provides part of redux state to component properties.
 *
 * @param state - redux root state.
 */
const mapStateToProps = (
  state: RootState
): EmulatorsSelectComponentStateProperties => {
  return {
    availableEmulatorNames: state.emulators.availableEmulatorNames,
    hasError: state.emulators.wizard.hasError,
  }
}

/**
 * Dispatch selectedEmulatorIdSet() function to component properties.
 */
const mapDispatchToProps: EmulatorSelectComponentDispatchProperties = {
  setSelectedEmulatorId: (emulatorId: EmulatorId) =>
    selectedEmulatorIdSet(emulatorId),
}

/**
 * Connect this container to the component.
 */
export default connect(mapStateToProps, mapDispatchToProps)(EmulatorsSelect)
