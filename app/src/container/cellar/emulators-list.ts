import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import EmulatorsList, {
  EmulatorsListComponentStateProperties,
} from 'components/cellar/emulators-list/emulators-list-component'

/**
 * Provides part of redux state to component properties.
 *
 * @param state - redux root state.
 */
const mapStateToProps = (
  state: RootState
): EmulatorsListComponentStateProperties => {
  return {
    emulatorsInCellar: state.cellar.present.emulatorsInCellar,
  }
}

/**
 * Connect this container to the component.
 */
export default connect(mapStateToProps)(EmulatorsList)
