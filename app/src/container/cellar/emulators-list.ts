import { connect } from 'react-redux'
import { RootState } from 'app/src/redux/store'
import EmulatorsListComponent, {
  EmulatorsListComponentStateProperties,
} from 'app/src/components/cellar/emulators-list/emulators-list-component'

/**
 * Provides part of redux state to component properties.
 *
 * @param state - redux root state.
 */
const mapStateToProps = (
  state: RootState
): EmulatorsListComponentStateProperties => {
  return {
    cellar: state.cellar.currentCellar,
    emulatorsInCellar: state.emulators.emulatorsInCellar,
  }
}

/**
 * Connect this container to the component.
 */
export default connect(mapStateToProps)(EmulatorsListComponent)
