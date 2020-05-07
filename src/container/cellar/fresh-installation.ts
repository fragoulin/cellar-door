import { connect } from 'react-redux'
import { FreshInstallation, FreshInstallationComponentDispatchProperties } from '../../components/cellar/fresh-installation/fresh-installation-component'
import { createCellar } from '../../store/cellar/actions'
import { CellarActionTypes } from '../../store/cellar/types'

const mapDispatchToProps: FreshInstallationComponentDispatchProperties = {
  createCellar: (): CellarActionTypes => createCellar()
}

export default connect(
  null,
  mapDispatchToProps
)(FreshInstallation)
