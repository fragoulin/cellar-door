import { connect } from 'react-redux'
import ConfigureEmulator, {
  ConfigureEmulatorComponentDispatchProperties,
} from 'components/emulator/configuration/configure-emulator/configure-emulator-component'
import { Emulator } from 'models/emulator/types'
import { emulatorAddedToCellar } from 'redux/modules/cellar'

/**
 * Dispatch some functions to component properties.
 */
const mapDispatchToProps: ConfigureEmulatorComponentDispatchProperties = {
  addEmulatorToCellar: (emulator: Emulator) => emulatorAddedToCellar(emulator),
}

/**
 * Connect this container to the component.
 */
export default connect(null, mapDispatchToProps)(ConfigureEmulator)
