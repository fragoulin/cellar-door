import { EmulatorId, Emulator } from '../../models/emulator/emulator'
import * as EmulatorsService from '../../services/emulators-service'
import { createSlice } from '@reduxjs/toolkit'

// State
export interface EmulatorIdsToName {
  id: EmulatorId;
  name: string;
}

interface EmulatorsState {
  availableEmulatorNames: EmulatorIdsToName[];
  emulatorsInCellar: Emulator[];
  wizard: {
    hasError: boolean;
    selectedEmulatorId: EmulatorId | undefined;
    emulatorCurrentlyConfigured: Emulator | undefined;
  };
}

const initialState: EmulatorsState = {
  availableEmulatorNames: [],
  wizard: {
    hasError: false,
    selectedEmulatorId: undefined,
    emulatorCurrentlyConfigured: undefined
  },
  emulatorsInCellar: []
}

const emulatorsSlice = createSlice({
  name: 'cellar',
  initialState: initialState,
  reducers: {
    buildAvailableEmulatorNamesList (state): void {
      state.availableEmulatorNames = EmulatorsService.buildAvailableEmulatorNamesList()
    },
    setSelectedEmulatorId (state, action): void {
      state.wizard.selectedEmulatorId = action.payload
    },
    setWizardStatus (state, action): void {
      state.wizard.hasError = action.payload
    },
    createEmulator (state, action): void {
      state.wizard.emulatorCurrentlyConfigured = EmulatorsService.getEmulator(action.payload)
    },
    updateEmulatorConfiguration (state, action): void {
      if (state.wizard.emulatorCurrentlyConfigured) {
        const newEmulator = EmulatorsService.getEmulator(state.wizard.emulatorCurrentlyConfigured.Id)
        if (newEmulator) {
          newEmulator.configurations = action.payload
          state.wizard.emulatorCurrentlyConfigured = newEmulator
        }
      }
    },
    addEmulatorToCellar (state, action): void {
      state.emulatorsInCellar.push(action.payload)
    },
    removeEmulatorFromCellar (state, action): void {
      state.emulatorsInCellar = state.emulatorsInCellar.filter(emulator => { return emulator.Id !== action.payload.Id })
    }
  }
})

export const { buildAvailableEmulatorNamesList, setSelectedEmulatorId, setWizardStatus, createEmulator, updateEmulatorConfiguration, addEmulatorToCellar, removeEmulatorFromCellar } = emulatorsSlice.actions
export default emulatorsSlice.reducer
