import { Cellar } from 'models/cellar'
import { createSlice } from '@reduxjs/toolkit'
import { Emulator } from 'models/emulator/types'

/**
 * Cellar state definition.
 */
export interface CellarState {
  currentCellar: Cellar | undefined
  currentLocale: string
  emulatorsInCellar: Emulator[]
}

/**
 * Initial state for cellar state.
 */
const initialState: CellarState = {
  currentCellar: undefined,
  currentLocale: 'en',
  emulatorsInCellar: [],
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
      state.emulatorsInCellar = []
    },
    cellarClosed(state): void {
      state.currentCellar = undefined
      state.emulatorsInCellar = []
    },
    currentLocaleSet(state, action): void {
      state.currentLocale = action.payload
    },
    emulatorAddedToCellar(state, action): void {
      state.emulatorsInCellar.push(action.payload)
    },
    emulatorRemovedFromCellar(state, action): void {
      console.log(action, 'emulatorRemovedFromCellar')
      state.emulatorsInCellar = state.emulatorsInCellar.filter((emulator) => {
        return emulator.Id !== action.payload
      })
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
  emulatorAddedToCellar,
  emulatorRemovedFromCellar,
} = cellarSlice.actions

/**
 * Cellar reducer.
 */
export default cellarSlice.reducer
