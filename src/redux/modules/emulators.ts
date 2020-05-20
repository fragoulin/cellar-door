import { EmulatorId, Emulator } from '../../models/emulator/types'
import { createSlice } from '@reduxjs/toolkit'
import { emulatorsService } from '../../rendererDependencies'

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
  name: 'emulators',
  initialState: initialState,
  reducers: {
    availableEmulatorNamesListBuilt (state): void {
      state.availableEmulatorNames = emulatorsService.buildAvailableEmulatorNamesList()
    },
    selectedEmulatorIdSet (state, action): void {
      state.wizard.selectedEmulatorId = action.payload
    },
    wizardStatusSet (state, action): void {
      state.wizard.hasError = action.payload
    },
    emulatorCreated (state, action): void {
      state.wizard.emulatorCurrentlyConfigured = emulatorsService.getEmulator(action.payload)
    },
    emulatorConfigurationUpdated (state, action): void {
      if (state.wizard.emulatorCurrentlyConfigured) {
        const newEmulator = emulatorsService.getEmulator(state.wizard.emulatorCurrentlyConfigured.Id)
        if (newEmulator) {
          newEmulator.configurations = action.payload
          state.wizard.emulatorCurrentlyConfigured = newEmulator
        }
      }
    },
    emulatorAddedToCellar (state, action): void {
      state.emulatorsInCellar.push(action.payload)
    },
    emulatorRemovedFromCellar (state, action): void {
      state.emulatorsInCellar = state.emulatorsInCellar.filter(emulator => { return emulator.Id !== action.payload.Id })
    }
  }
})

export const { availableEmulatorNamesListBuilt, selectedEmulatorIdSet, wizardStatusSet, emulatorCreated, emulatorConfigurationUpdated, emulatorAddedToCellar, emulatorRemovedFromCellar } = emulatorsSlice.actions
export default emulatorsSlice.reducer
