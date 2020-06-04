import { pick, cloneDeep } from 'lodash'
import { Emulator } from 'models/emulator/types'
import { getEmulator } from 'services/emulators-service'
import { RootState } from 'redux/store'

/**
 * Alter specified state to storage.
 * - Remove present and past properties from state.
 * - Remove all properties from emulators, except Id and configuration.
 *
 * @param inboundState - state to alter before storage.
 * @returns state ready for storage.
 */
function getStateBeforeStoringToStorage(inboundState: RootState): RootState {
  const state = cloneDeep(inboundState)

  state.cellar.past = []
  state.cellar.future = []
  state.cellar.present.emulatorsInCellar.forEach((emulator, i, array) => {
    array[i] = pick(emulator, ['Id', 'configuration']) as Emulator
  })

  return state
}

/**
 * Alter specified state coming from storage to be used in app.
 * - Add static properties to emulators in addition to retrieved Id and configuration.
 *
 * @param outboundState - state to alter after loading from storage.
 * @returns root state ready to be used as preloaded state for redux.
 */
function getStateAfterGetingFromStorage(outboundState: RootState): RootState {
  const state = cloneDeep(outboundState)

  if (state && state.cellar) {
    state.cellar.present.emulatorsInCellar.forEach((emulator, i, array) => {
      const emulatorWithStaticProperties = getEmulator(emulator.Id)
      if (emulatorWithStaticProperties) {
        emulatorWithStaticProperties.configuration = emulator.configuration
        array[i] = emulatorWithStaticProperties
      }
    })
  }

  return state
}

export { getStateAfterGetingFromStorage, getStateBeforeStoringToStorage }
