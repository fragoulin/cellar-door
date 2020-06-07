import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import cellarReducer, {
  currentLocaleSet,
  cellarCreated,
} from './modules/cellar'
import undoable from 'redux-undo'
import * as localStorage from 'services/local-storage-service'
import { handleMenuAfterStateUpdate } from 'electron/menu/menu-handler'
import {
  getStateBeforeStoringToStorage,
  getStateAfterGettingFromStorage,
} from '../storage/cellar-transformers'
import { StateKey } from 'electron/constants'

/**
 * Reducers combined with undo.
 */
const rootReducer = combineReducers({
  cellar: undoable(cellarReducer, {
    filter: function filterAction(action) {
      // Ignore some actions in undo/redo history
      const actionTypesToIgnore = [cellarCreated.type, currentLocaleSet.type]
      return (
        actionTypesToIgnore.find((actionType) => actionType === action.type) ===
        undefined
      )
    },
  }),
})

/**
 * Root state definition.
 */
export type RootState = ReturnType<typeof rootReducer>

// Try to retrieve state from storage
let preloadedState = localStorage.get<RootState>(StateKey)
if (preloadedState) {
  preloadedState = getStateAfterGettingFromStorage(preloadedState)
}

/**
 * Create redux store.
 */
const store = configureStore({
  reducer: rootReducer,
  middleware: [logger],
  preloadedState: preloadedState,
})

// Listen for state update to alter menu items.
store.subscribe(() => {
  // Update menu items
  handleMenuAfterStateUpdate(store.getState())

  // Persist state when it is updated
  const storeToPersist = getStateBeforeStoringToStorage(store.getState())
  localStorage.store(StateKey, storeToPersist).catch(console.error)
})

export default store
