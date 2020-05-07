import { connect } from 'react-redux'
import { RootState } from '../../store/store'
import { Welcome, WelcomeComponentStateProperties } from '../../components/cellar/welcome/welcome-component'

const mapStateToProps = (state: RootState): WelcomeComponentStateProperties => {
  return {
    cellar: state.cellar.currentCellar,
    emulatorsInCellar: state.emulators.emulatorsInCellar
  }
}

export default connect(
  mapStateToProps
)(Welcome)
