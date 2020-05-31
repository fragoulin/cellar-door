import { Cellar } from 'app/src/models/cellar'
import { createSlice } from '@reduxjs/toolkit'

/**
 * Cellar state definition.
 */
interface CellarState {
  currentCellar: Cellar | undefined
  currentLocale: string
}

/**
 * Initial state for cellar state.
 */
const initialState: CellarState = {
  currentCellar: undefined,
  currentLocale: 'en',
}

/**
 * Redux slice for cellar store.
 */
const cellarSlice = createSlice({
  name: 'cellar',
  initialState: initialState,
  reducers: {
    cellarCreated(state): void {
      state.currentCellar = {}
    },
    cellarClosed(state): void {
      state.currentCellar = undefined
    },
    currentLocaleSet(state, action): void {
      state.currentLocale = action.payload
    },
  },
})

/**
 * Cellar actions.
 */
export const {
  cellarCreated,
  cellarClosed,
  currentLocaleSet,
} = cellarSlice.actions

/**
 * Cellar reducer.
 */
export default cellarSlice.reducer
