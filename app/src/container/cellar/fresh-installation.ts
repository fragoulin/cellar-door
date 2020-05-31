import { connect } from 'react-redux'
import FreshInstallation, {
  FreshInstallationComponentDispatchProperties,
} from 'app/src/components/cellar/fresh-installation/fresh-installation-component'
import { cellarCreated } from 'app/src/redux/modules/cellar'

/**
 * Dispatch cellarCreated() function to component properties.
 */
const mapDispatchToProps: FreshInstallationComponentDispatchProperties = {
  createCellar: () => cellarCreated(),
}

/**
 * Connect this container to the component.
 */
export default connect(null, mapDispatchToProps)(FreshInstallation)
