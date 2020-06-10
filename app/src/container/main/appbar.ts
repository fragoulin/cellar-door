import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import Appbar, {
  AppbarComponentStateProperties,
} from 'components/main/appbar/appbar'

/**
 * Provides part of redux state to component properties.
 *
 * @param state - redux root state.
 */
const mapStateToProps = (state: RootState): AppbarComponentStateProperties => {
  return {
    emulatorsInCellar: state.cellar.present.emulatorsInCellar,
  }
}

/**
 * Connect this container to the component.
 */
export default connect(mapStateToProps)(Appbar)
