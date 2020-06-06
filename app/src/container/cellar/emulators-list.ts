import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import EmulatorsList, {
  EmulatorsListComponentStateProperties,
  EmulatorsListComponentDispatchProperties,
} from 'components/cellar/emulators-list/emulators-list-component'
import { emulatorsReordered } from 'redux/modules/cellar'
import { EmulatorId } from 'models/emulator/types'

/**
 * Provides part of redux state to component properties.
 *
 * @param state - redux root state.
 */
const mapStateToProps = (
  state: RootState
): EmulatorsListComponentStateProperties => {
  return {
    emulatorsInCellar: state.cellar.present.emulatorsInCellar,
  }
}

/**
 * Dispatch cellarCreated() function to component properties.
 */
const mapDispatchToProps: EmulatorsListComponentDispatchProperties = {
  emulatorsReordered: (emulatorIds: EmulatorId[]) =>
    emulatorsReordered(emulatorIds),
}

/**
 * Connect this container to the component.
 */
export default connect(mapStateToProps, mapDispatchToProps)(EmulatorsList)
