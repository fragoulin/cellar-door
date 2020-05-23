import { connect } from 'react-redux'
import { RootState } from '../../redux/store'
import {
  CreateEmulatorComponentStateProperties,
  CreateEmulator,
  CreateEmulatorComponentDispatchProperties,
} from '../../components/emulator/creation/create-emulator/create-emulator-component'
import { Emulator } from '../../models/emulator/types'
import { emulatorAddedToCellar } from '../../redux/modules/emulators'

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
