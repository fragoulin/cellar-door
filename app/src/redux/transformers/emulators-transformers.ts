import { createTransform } from 'redux-persist'
import { EmulatorsState } from '../modules/emulators'

const EmulatorsTransform = createTransform(
  // transform state on its way to being serialized and persisted.
  (inboundState: EmulatorsState) => {
    return inboundState
  },
  // transform state being rehydrated
  (outboundState: EmulatorsState) => {
    return outboundState
  },
  // define which reducers this transform gets called for.
  { whitelist: ['emulators'] }
)

export default EmulatorsTransform
