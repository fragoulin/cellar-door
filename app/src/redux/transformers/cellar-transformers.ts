import { createTransform } from 'redux-persist'
import { CellarState } from 'redux/modules/cellar'
import { pick, cloneDeep } from 'lodash'
import { Emulator } from 'models/emulator/types'
import { getEmulator } from 'services/emulators-service'
import { StateWithHistory } from 'redux-undo'

const CellarTransform = createTransform(
  // Keep only Id and configuration when persisting emulators
  (inboundState: StateWithHistory<CellarState>) => {
    const state = cloneDeep(inboundState)

    state.past = []
    state.present.emulatorsInCellar.forEach((emulator, i, array) => {
      array[i] = pick(emulator, ['Id', 'configuration']) as Emulator
    })
    state.future = []

    return state
  },
  // Rehydrate emulator with static properties
  (outboundState: StateWithHistory<CellarState>) => {
    const state = cloneDeep(outboundState)

    state.past = []
    state.present.emulatorsInCellar.forEach((emulator, i, array) => {
      const emulatorWithStaticProperties = getEmulator(emulator.Id)
      if (emulatorWithStaticProperties) {
        emulatorWithStaticProperties.configuration = emulator.configuration
        array[i] = emulatorWithStaticProperties
      }
    })
    state.future = []

    return state
  },
  // define which reducers this transform gets called for.
  { whitelist: ['cellar'] }
)

export default CellarTransform
