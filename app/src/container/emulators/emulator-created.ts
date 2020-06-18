import { connect } from 'react-redux'
import { Emulator } from 'models/emulator/types'
import { emulatorAddedToCellar } from 'redux/modules/cellar'
import emulatorCreated, {
  EmulatorCreatedComponentDispatchProperties,
} from 'components/emulator/creation/emulator-created/emulator-created'

/**
 * Dispatch some functions to component properties.
 */
const mapDispatchToProps: EmulatorCreatedComponentDispatchProperties = {
  addEmulatorToCellar: (emulator: Emulator) => emulatorAddedToCellar(emulator),
}

/**
 * Connect this container to the component.
 */
export default connect(null, mapDispatchToProps)(emulatorCreated)
