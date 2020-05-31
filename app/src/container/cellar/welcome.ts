import { connect } from 'react-redux'
import { RootState } from 'app/src/redux/store'
import Welcome, {
  WelcomeComponentStateProperties,
} from 'app/src/components/cellar/welcome/welcome-component'

/**
 * Provides part of redux state to component properties.
 *
 * @param state - redux root state.
 */
const mapStateToProps = (state: RootState): WelcomeComponentStateProperties => {
  return {
    cellar: state.cellar.currentCellar,
    emulatorsInCellar: state.emulators.emulatorsInCellar,
  }
}

/**
 * Connect this container to the component.
 */
export default connect(mapStateToProps)(Welcome)
