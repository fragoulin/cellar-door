import { Cellar } from 'models/cellar'
import { createSlice } from '@reduxjs/toolkit'
import { Emulator, EmulatorId } from 'models/emulator/types'
import { buildAvailableEmulatorNamesList } from 'services/emulators-service'

/**
 * Maps emulator Ids to emulator names.
 */
export interface EmulatorIdsToName {
  id: EmulatorId
  name: string
}

/**
 * Cellar state definition.
 */
export interface CellarState {
  currentCellar: Cellar | undefined
  currentLocale: string
  emulatorsInCellar: Emulator[]
  availableEmulatorNames: EmulatorIdsToName[]
}

/**
 * Initial state for cellar state.
 */
export const initialState: CellarState = {
  currentCellar: undefined,
  currentLocale: 'en',
  emulatorsInCellar: [],
  availableEmulatorNames: [],
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
      state.availableEmulatorNames = buildAvailableEmulatorNamesList()
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
      state.emulatorsInCellar = state.emulatorsInCellar.filter(
        (emulator) => emulator.Id !== action.payload
      )
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
