import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import Root, { RootComponentStateProperties } from 'components/main/root/root'

/**
 * Provides part of redux state to component properties.
 *
 * @param state - redux root state.
 */
const mapStateToProps = (state: RootState): RootComponentStateProperties => {
  return {
    darkMode: state.preferences.present.darkMode,
  }
}

/**
 * Connect this container to the component.
 */
export default connect(mapStateToProps)(Root)
