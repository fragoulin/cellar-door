import { connect } from 'react-redux'
import { FreshInstallation, FreshInstallationComponentDispatchProperties } from '../../components/cellar/fresh-installation/fresh-installation-component'
import { cellarCreated } from '../../redux/modules/cellar'

const mapDispatchToProps: FreshInstallationComponentDispatchProperties = {
  createCellar: () => cellarCreated()
}

export default connect(
  null,
  mapDispatchToProps
)(FreshInstallation)
