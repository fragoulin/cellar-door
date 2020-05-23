import { combineReducers } from 'redux'
import { configureStore, Store } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import cellarReducer from './modules/cellar'
import emulatorsReducer from './modules/emulators'
import { CellarWin } from '../preload'

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
 * Current store.
 */
let store: Store

/**
 * Listeners to notify when Redux state is updated.
 */
const listeners: ((store: Store) => void)[] = []

/**
 * Callback when state had been loaded
 *
 * @param err - if an error occured
 * @param state - loaded state
 */
const stateLoaded = (err: Error, state: RootState | null): void => {
  if (err) {
    console.error(err)
  } else {
    if (state === null) {
      store = configureStore({
        reducer: rootReducer,
        middleware: [logger],
      })
    } else {
      store = configureStore({
        reducer: rootReducer,
        middleware: [logger],
        preloadedState: state,
      })
    }

    // Subscribe to redux state update
    store.subscribe(() => {
      win.api.send('saveState', store.getState())
    })

    // Notify listeners
    listeners.forEach((listener) => {
      listener(store)
    })
  }
}

/**
 * Callback when state has been saved
 *
 * @param err - if an error occured
 */
const stateSaved = (err: Error): void => {
  if (err) {
    console.error(err)
  }
}

win.api.receive('stateLoaded', stateLoaded)
win.api.receive('stateSaved', stateSaved)
win.api.send('loadState')

/**
 * Callback when store is ready.
 *
 * @param callback - function called when store is ready.
 */
export const whenReady = (callback: (store: Store) => void): void => {
  listeners.push(callback)
}
