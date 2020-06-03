import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import cellarReducer, {
  initialState as cellarInitialState,
} from './modules/cellar'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistConfig } from 'redux-persist/es/types'
import CellarTransform from './transformers/cellar-transformers'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import undoable from 'redux-undo'

/**
 * Reducers combined.
 */
const rootReducer = combineReducers({
  cellar: undoable(cellarReducer),
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
  transforms: [CellarTransform],
  stateReconciler: autoMergeLevel2,
}
const persistedReducer = persistReducer(persistReducerConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: [logger],
  preloadedState: {
    cellar: {
      past: [],
      present: cellarInitialState,
      future: [],
    },
  },
})
const persistor = persistStore(store)

export { store, persistor }
