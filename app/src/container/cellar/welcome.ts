import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import Welcome, {
  WelcomeComponentStateProperties,
  WelcomeComponentDispatchProperties,
} from 'components/cellar/welcome/welcome-component'
import { cellarCreated } from 'redux/modules/cellar'

/**
 * Provides part of redux state to component properties.
 *
 * @param state - redux root state.
 */
const mapStateToProps = (state: RootState): WelcomeComponentStateProperties => {
  return {
    cellar: state.cellar.present.currentCellar,
    emulatorsInCellar: state.cellar.present.emulatorsInCellar,
  }
}

/**
 * Dispatch cellarCreated() function to component properties.
 */
const mapDispatchToProps: WelcomeComponentDispatchProperties = {
  createCellar: () => cellarCreated(),
}

/**
 * Connect this container to the component.
 */
export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
