import { combineReducers, Store } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import cellarReducer from './modules/cellar'
import emulatorsReducer from './modules/emulators'

const rootReducer = combineReducers({
  cellar: cellarReducer,
  emulators: emulatorsReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default configureStore({
  reducer: rootReducer,
  middleware: [logger]
}) as Store
