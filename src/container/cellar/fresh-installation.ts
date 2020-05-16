import { connect } from 'react-redux'
import { FreshInstallation, FreshInstallationComponentDispatchProperties } from '../../components/cellar/fresh-installation/fresh-installation-component'
import { CellarActions, CREATE } from '../../redux/modules/cellar'
import { ActionsWithoutPayload } from '../../redux'

const mapDispatchToProps: FreshInstallationComponentDispatchProperties = {
  createCellar: (): ActionsWithoutPayload<typeof CREATE> => CellarActions.create()
}

export default connect(
  null,
  mapDispatchToProps
)(FreshInstallation)
