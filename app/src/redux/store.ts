import { combineReducers } from 'redux'
import { configureStore, Store } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import cellarReducer from './modules/cellar'
import emulatorsReducer from './modules/emulators'

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

const localStorageStateKey = 'cellar.state'

/**
 * Initialize store
 *
 * @param state - loaded state from local storage, or undefined in case of new installation.
 */
const initializeStore = (state: RootState | undefined): Store => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [logger],
    ...(state
      ? {
          preloadedState: state,
        }
      : {}),
  })

  // Subscribe to redux state update
  store.subscribe(() => {
    if (store) {
      const stateJson = JSON.stringify(store.getState())
      localStorage.setItem(localStorageStateKey, stateJson)
    }
  })

  return store
}

/**
 * Load state from storage and return promise.
 *
 * @returns a promise when store is ready.
 */
export const whenReady = (): Promise<Store<RootState>> => {
  return new Promise((resolve) => {
    const stateJson = localStorage.getItem(localStorageStateKey)
    let state: RootState | undefined
    if (stateJson) {
      state = JSON.parse(stateJson)
    }
    resolve(initializeStore(state))
  })
}
