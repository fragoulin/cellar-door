import { connect } from 'react-redux'
import { FreshInstallation, FreshInstallationComponentDispatchProperties } from '../../components/cellar/fresh-installation/fresh-installation-component'
import { createCellar } from '../../redux/modules/cellar'

const mapDispatchToProps: FreshInstallationComponentDispatchProperties = {
  createCellar: () => createCellar()
}

export default connect(
  null,
  mapDispatchToProps
)(FreshInstallation)
