import { createStore, combineReducers } from 'redux'
import { cellarReducer } from './cellar/reducers'
import { emulatorsReducer } from './emulators/reducers'

const rootReducer = combineReducers({
  cellar: cellarReducer,
  emulators: emulatorsReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default createStore(rootReducer)
