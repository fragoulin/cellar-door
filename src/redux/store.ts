import { combineReducers } from 'redux'
import { configureStore, Store } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import cellarReducer from './modules/cellar'
import emulatorsReducer from './modules/emulators'
import { CellarWin } from '../preload'

// Combine reducers
const rootReducer = combineReducers({
  cellar: cellarReducer,
  emulators: emulatorsReducer
})

// Export state type
export type RootState = ReturnType<typeof rootReducer>

const win = window as CellarWin
let store: Store
const listeners: ((store: Store) => void)[] = []

// Callback when state had been loaded
const stateLoaded = (err: Error, state: RootState | null): void => {
  if (err) {
    console.error(err)
  } else {
    if (state === null) {
      store = configureStore({
        reducer: rootReducer,
        middleware: [logger]
      })
    } else {
      store = configureStore({
        reducer: rootReducer,
        middleware: [logger],
        preloadedState: state
      })
    }

    // Subscribe to redux state update
    store.subscribe(() => {
      win.api.send('saveState', store.getState())
    })

    // Notify listeners
    listeners.forEach(listener => {
      listener(store)
    })
  }
}

// Callback when state has been saved
const stateSaved = (err: Error): void => {
  if (err) {
    console.error(err)
  }
}

win.api.receive('stateLoaded', stateLoaded)
win.api.receive('stateSaved', stateSaved)
win.api.send('loadState')

export const whenReady = (callback: (store: Store) => void): void => {
  listeners.push(callback)
}
