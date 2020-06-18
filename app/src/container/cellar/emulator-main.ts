import { connect } from 'react-redux'
import EmulatorMain, {
  EmulatorMainComponentStateProperties,
} from 'components/cellar/emulator-main/emulator-main'
import { RootState } from 'redux/store'

/**
 * Provides part of redux state to component properties.
 *
 * @param state - redux root state.
 */
const mapStateToProps = (
  state: RootState
): EmulatorMainComponentStateProperties => {
  return {
    emulatorsInCellar: state.cellar.present.emulatorsInCellar,
  }
}

/**
 * Connect this container to the component.
 */
export default connect(mapStateToProps)(EmulatorMain)
