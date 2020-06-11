import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import Appbar, {
  AppbarComponentStateProperties,
  AppbarComponentDispatchProperties,
} from 'components/main/appbar/appbar'
import { lightDarkModeToggled } from 'redux/modules/preferences'

/**
 * Provides part of redux state to component properties.
 *
 * @param state - redux root state.
 */
const mapStateToProps = (state: RootState): AppbarComponentStateProperties => {
  return {
    emulatorsInCellar: state.cellar.present.emulatorsInCellar,
    darkMode: state.preferences.present.darkMode,
  }
}

/**
 * Dispatch some functions to component properties.
 */
const mapDispatchToProps: AppbarComponentDispatchProperties = {
  toggleLightDarkMode: () => lightDarkModeToggled(),
}

/**
 * Connect this container to the component.
 */
export default connect(mapStateToProps, mapDispatchToProps)(Appbar)
