import { EmulatorId, Emulator } from 'app/src/models/emulator/types'
import { createSlice } from '@reduxjs/toolkit'
import {
  buildAvailableEmulatorNamesList,
  getEmulator,
} from 'app/src/services/emulators-service'

/**
 * Maps emulator Ids to emulator names.
 */
export interface EmulatorIdsToName {
  id: EmulatorId
  name: string
}

/**
 * Emulators state definition.
 */
interface EmulatorsState {
  availableEmulatorNames: EmulatorIdsToName[]
  emulatorsInCellar: Emulator[]
  wizard: {
    hasError: boolean
    selectedEmulatorId: EmulatorId | undefined
    emulatorCurrentlyConfigured: Emulator | undefined
  }
}

/**
 * Initial state for emulators state.
 */
const initialState: EmulatorsState = {
  availableEmulatorNames: [],
  wizard: {
    hasError: false,
    selectedEmulatorId: undefined,
    emulatorCurrentlyConfigured: undefined,
  },
  emulatorsInCellar: [],
}

/**
 * Slice for emulators store.
 */
const emulatorsSlice = createSlice({
  name: 'emulators',
  initialState: initialState,
  reducers: {
    availableEmulatorNamesListBuilt(state): void {
      state.availableEmulatorNames = buildAvailableEmulatorNamesList()
    },
    selectedEmulatorIdSet(state, action): void {
      state.wizard.selectedEmulatorId = action.payload
    },
    wizardStatusSet(state, action): void {
      state.wizard.hasError = action.payload
    },
    emulatorCreated(state, action): void {
      state.wizard.emulatorCurrentlyConfigured = getEmulator(action.payload)
    },
    emulatorConfigurationUpdated(state, action): void {
      if (!state.wizard.emulatorCurrentlyConfigured) return
      const newEmulator = getEmulator(
        state.wizard.emulatorCurrentlyConfigured.Id
      )
      if (!newEmulator) return
      newEmulator.configurations = action.payload
      state.wizard.emulatorCurrentlyConfigured = newEmulator
    },
    emulatorAddedToCellar(state, action): void {
      state.emulatorsInCellar.push(action.payload)
    },
    emulatorRemovedFromCellar(state, action): void {
      state.emulatorsInCellar = state.emulatorsInCellar.filter((emulator) => {
        return emulator.Id !== action.payload.Id
      })
    },
  },
})

/**
 * Emulators actions.
 */
export const {
  availableEmulatorNamesListBuilt,
  selectedEmulatorIdSet,
  wizardStatusSet,
  emulatorCreated,
  emulatorConfigurationUpdated,
  emulatorAddedToCellar,
  emulatorRemovedFromCellar,
} = emulatorsSlice.actions

/**
 * Emulators reducer.
 */
export default emulatorsSlice.reducer
