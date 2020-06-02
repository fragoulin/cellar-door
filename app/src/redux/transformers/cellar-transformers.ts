import { createTransform } from 'redux-persist'
import { CellarState } from 'redux/modules/cellar'
import { pick, cloneDeep } from 'lodash'
import { Emulator } from 'models/emulator/types'
import { getEmulator } from 'services/emulators-service'

const CellarTransform = createTransform(
  // Keep only Id and configuration when persisting emulators
  (inboundState: CellarState) => {
    const state = cloneDeep(inboundState)

    state.emulatorsInCellar.forEach((emulator, i, array) => {
      array[i] = pick(emulator, ['Id', 'configuration']) as Emulator
    })

    return state
  },
  // Rehydrate emulator with static properties
  (outboundState: CellarState) => {
    const state = cloneDeep(outboundState)

    state.emulatorsInCellar.forEach((emulator, i, array) => {
      const emulatorWithStaticProperties = getEmulator(emulator.Id)
      if (emulatorWithStaticProperties) {
        emulatorWithStaticProperties.configuration = emulator.configuration
        array[i] = emulatorWithStaticProperties
      }
    })

    return state
  },
  // define which reducers this transform gets called for.
  { whitelist: ['cellar'] }
)

export default CellarTransform
