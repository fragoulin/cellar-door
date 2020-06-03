import { connect } from 'react-redux'
import AddEmulator, {
  AddEmulatorComponentStateProperties,
} from 'components/emulator/creation/add-emulator/add-emulator-component'
import { RootState } from 'redux/store'

/**
 * Provides part of redux state to component properties.
 *
 * @param state - redux root state.
 */
const mapStateToProps = (
  state: RootState
): AddEmulatorComponentStateProperties => {
  return {
    emulatorsInCellar: state.cellar.present.emulatorsInCellar,
  }
}

/**
 * Connect this container to the component.
 */
export default connect(mapStateToProps)(AddEmulator)
