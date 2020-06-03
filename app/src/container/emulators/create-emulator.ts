import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import CreateEmulator, {
  CreateEmulatorComponentStateProperties,
} from 'components/emulator/creation/create-emulator/create-emulator-component'

/**
 * Provides part of redux state to component properties.
 *
 * @param state - redux root state.
 */
const mapStateToProps = (
  state: RootState
): CreateEmulatorComponentStateProperties => {
  return {
    emulator: state.cellar.present.emulatorsInCellar.slice(-1).pop(),
  }
}

/**
 * Connect this container to the component.
 */
export default connect(mapStateToProps)(CreateEmulator)
