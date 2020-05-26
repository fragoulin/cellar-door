import { combineReducers } from 'redux'
import { configureStore, Store } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import cellarReducer from './modules/cellar'
import emulatorsReducer from './modules/emulators'
import { CellarWin } from '../../electron/preload'
import _ from 'lodash'

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
 * Cellar window typed with api definition for IPC.
 */
const win = window as CellarWin

/**
 * Initialize store
 *
 * @param state - loaded state
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
    win.api.send('saveState', store.getState())
  })

  return store
}

/**
 * Callback when store is ready.
 *
 * @param callback - function called when store is ready.
 */
export const whenReady = (): Promise<Store> => {
  return new Promise((resolve, reject) => {
    win.api.send('loadState')
    win.api.receive(
      'stateLoaded',
      (err: Error | undefined, state: RootState | undefined) => {
        if (err) reject(err)
        else resolve(initializeStore(_.cloneDeep(state)))
      }
    )
  })
}
