import { connect } from 'react-redux'
import { RootState } from 'app/src/redux/store'
import CreateEmulator, {
  CreateEmulatorComponentStateProperties,
  CreateEmulatorComponentDispatchProperties,
} from 'app/src/components/emulator/creation/create-emulator/create-emulator-component'
import { Emulator } from 'app/src/models/emulator/types'
import { emulatorAddedToCellar } from 'app/src/redux/modules/emulators'

/**
 * Provides part of redux state to component properties.
 *
 * @param state - redux root state.
 */
const mapStateToProps = (
  state: RootState
): CreateEmulatorComponentStateProperties => {
  return {
    emulator: state.emulators.wizard.emulatorCurrentlyConfigured,
  }
}

/**
 * Dispatch emulatorAddedToCellar() function to component properties.
 */
const mapDispatchToProps: CreateEmulatorComponentDispatchProperties = {
  addEmulatorToCellar: (emulator: Emulator) => emulatorAddedToCellar(emulator),
}

/**
 * Connect this container to the component.
 */
export default connect(mapStateToProps, mapDispatchToProps)(CreateEmulator)
