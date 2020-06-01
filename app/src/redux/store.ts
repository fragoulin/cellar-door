import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import cellarReducer from './modules/cellar'
import emulatorsReducer from './modules/emulators'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistConfig } from 'redux-persist/es/types'
import EmulatorsTransform from './transformers/emulators-transformers'
import CellarTransform from './transformers/cellar-transformers'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

/**
 * Reducers combined.
 */
const rootReducer = combineReducers({
  cellar: cellarReducer,
  emulators: emulatorsReducer,
})

/**
 * Root state definition.
 */
export type RootState = ReturnType<typeof rootReducer>

/**
 * Persistence configuration.
 */
const persistReducerConfig: PersistConfig<RootState> = {
  key: 'root',
  storage,
  transforms: [CellarTransform, EmulatorsTransform],
  stateReconciler: autoMergeLevel2,
}
const persistedReducer = persistReducer(persistReducerConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: [logger],
})
const persistor = persistStore(store)

export { store, persistor }
