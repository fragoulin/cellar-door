import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import EmulatorsSelect, {
  EmulatorsSelectComponentStateProperties,
} from 'components/emulator/configuration/emulators-select/emulators-select'

/**
 * Provides part of redux state to component properties.
 *
 * @param state - redux root state.
 */
const mapStateToProps = (
  state: RootState
): EmulatorsSelectComponentStateProperties => {
  return {
    availableEmulatorNames: state.cellar.present.availableEmulatorNames,
  }
}

/**
 * Connect this container to the component.
 */
export default connect(mapStateToProps)(EmulatorsSelect)
