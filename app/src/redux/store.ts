import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import cellarReducer from './modules/cellar'
import emulatorsReducer from './modules/emulators'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

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
const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: [logger],
})
const persistor = persistStore(store)

export { store, persistor }
