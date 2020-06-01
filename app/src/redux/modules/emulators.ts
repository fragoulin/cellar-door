import { EmulatorId, Emulator } from '../../models/emulator/types'
import { createSlice } from '@reduxjs/toolkit'
import {
  buildAvailableEmulatorNamesList,
  getEmulator,
} from '../../services/emulators-service'

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
export interface EmulatorsState {
  availableEmulatorNames: EmulatorIdsToName[]
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
      newEmulator.configuration = action.payload
      state.wizard.emulatorCurrentlyConfigured = newEmulator
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
} = emulatorsSlice.actions

/**
 * Emulators reducer.
 */
export default emulatorsSlice.reducer
