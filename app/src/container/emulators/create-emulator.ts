import { connect } from 'react-redux'
import CreateEmulator, {
  CreateEmulatorComponentDispatchProperties,
} from 'components/emulator/creation/create-emulator/create-emulator'
import { Emulator } from 'models/emulator/types'
import { emulatorAddedToCellar } from 'redux/modules/cellar'

/**
 * Dispatch some functions to component properties.
 */
const mapDispatchToProps: CreateEmulatorComponentDispatchProperties = {
  addEmulatorToCellar: (emulator: Emulator) => emulatorAddedToCellar(emulator),
}

/**
 * Connect this container to the component.
 */
export default connect(null, mapDispatchToProps)(CreateEmulator)
