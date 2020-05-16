import { createAction, createActionPayload, ActionsUnion } from '..'
import { EmulatorId, Emulator } from '../../models/emulator/emulator'
import { EmulatorConfiguration } from '../../models/emulator/emulator-configuration'
import { List } from 'immutable'
import * as EmulatorsService from '../../services/emulators-service'

// Actions
export const BUILD_AVAILABLE_EMULATOR_NAMES_LIST = 'BUILD_AVAILABLE_EMULATOR_NAMES_LIST'
export const SET_SELECTED_EMULATOR_ID = 'SET_SELECTED_EMULATOR_ID'
export const SET_WIZARD_STATUS = 'SET_WIZARD_STATUS'
export const CREATE_EMULATOR = 'CREATE_EMULATOR'
export const UPDATE_EMULATOR_CONFIGURATION = 'UPDATE_EMULATOR_CONFIGURATION'
export const ADD_EMULATOR_TO_CELLAR = 'ADD_EMULATOR_TO_CELLAR'
export const REMOVE_EMULATOR_FROM_CELLAR = 'REMOVE_EMULATOR_FROM_CELLAR'

export const EmulatorsActions = {
  buildAvailableEmulatorNamesList: createAction<typeof BUILD_AVAILABLE_EMULATOR_NAMES_LIST>(BUILD_AVAILABLE_EMULATOR_NAMES_LIST),
  setSelectedEmulatorId: createActionPayload<typeof SET_SELECTED_EMULATOR_ID, EmulatorId>(SET_SELECTED_EMULATOR_ID),
  setWizardStatus: createActionPayload<typeof SET_WIZARD_STATUS, boolean>(SET_WIZARD_STATUS),
  createEmulator: createActionPayload<typeof CREATE_EMULATOR, EmulatorId>(CREATE_EMULATOR),
  updateEmulatorConfiguration: createActionPayload<typeof UPDATE_EMULATOR_CONFIGURATION, List<EmulatorConfiguration>>(UPDATE_EMULATOR_CONFIGURATION),
  addEmulatorToCellar: createActionPayload<typeof ADD_EMULATOR_TO_CELLAR, Emulator>(ADD_EMULATOR_TO_CELLAR),
  removeEmulatorFromCellar: createActionPayload<typeof REMOVE_EMULATOR_FROM_CELLAR, Emulator>(REMOVE_EMULATOR_FROM_CELLAR)
}

// State
export interface EmulatorIdsToName {
  id: EmulatorId;
  name: string;
}

interface EmulatorsState {
  availableEmulatorNames: List<EmulatorIdsToName>;
  emulatorsInCellar: List<Emulator>;
  wizard: {
    hasError: boolean;
    selectedEmulatorId: EmulatorId | undefined;
    emulatorCurrentlyConfigured: Emulator | undefined;
  };
}

const initialState: EmulatorsState = {
  availableEmulatorNames: List(),
  wizard: {
    hasError: false,
    selectedEmulatorId: undefined,
    emulatorCurrentlyConfigured: undefined
  },
  emulatorsInCellar: List()
}

// Reducer
export function emulatorsReducer (
  state = initialState,
  action: ActionsUnion<typeof EmulatorsActions>
): EmulatorsState {
  switch (action.type) {
    case BUILD_AVAILABLE_EMULATOR_NAMES_LIST:
      return {
        availableEmulatorNames: EmulatorsService.buildAvailableEmulatorNamesList(),
        wizard: {
          hasError: false,
          selectedEmulatorId: undefined,
          emulatorCurrentlyConfigured: state.wizard.emulatorCurrentlyConfigured
        },
        emulatorsInCellar: state.emulatorsInCellar
      }
    case SET_SELECTED_EMULATOR_ID:
      return {
        availableEmulatorNames: state.availableEmulatorNames,
        wizard: {
          emulatorCurrentlyConfigured: state.wizard.emulatorCurrentlyConfigured,
          hasError: false,
          selectedEmulatorId: action.payload
        },
        emulatorsInCellar: state.emulatorsInCellar
      }
    case SET_WIZARD_STATUS:
      return {
        availableEmulatorNames: state.availableEmulatorNames,
        wizard: {
          hasError: action.payload,
          selectedEmulatorId: state.wizard.selectedEmulatorId,
          emulatorCurrentlyConfigured: state.wizard.emulatorCurrentlyConfigured
        },
        emulatorsInCellar: state.emulatorsInCellar
      }
    case CREATE_EMULATOR:
      return {
        availableEmulatorNames: state.availableEmulatorNames,
        wizard: {
          hasError: false,
          selectedEmulatorId: undefined,
          emulatorCurrentlyConfigured: EmulatorsService.getEmulator(action.payload)
        },
        emulatorsInCellar: state.emulatorsInCellar
      }
    case UPDATE_EMULATOR_CONFIGURATION: {
      if (!state.wizard.emulatorCurrentlyConfigured) {
        return state
      }

      const newEmulator = EmulatorsService.getEmulator(state.wizard.emulatorCurrentlyConfigured.Id)
      if (newEmulator) {
        newEmulator.configurations = action.payload
      }

      return {
        availableEmulatorNames: state.availableEmulatorNames,
        wizard: {
          hasError: state.wizard.hasError,
          selectedEmulatorId: state.wizard.selectedEmulatorId,
          emulatorCurrentlyConfigured: newEmulator || state.wizard.emulatorCurrentlyConfigured
        },
        emulatorsInCellar: state.emulatorsInCellar
      }
    }
    case ADD_EMULATOR_TO_CELLAR:
      return {
        availableEmulatorNames: state.availableEmulatorNames,
        wizard: state.wizard,
        emulatorsInCellar: state.emulatorsInCellar.push(action.payload)
      }
    case REMOVE_EMULATOR_FROM_CELLAR:
      return {
        availableEmulatorNames: state.availableEmulatorNames,
        wizard: state.wizard,
        emulatorsInCellar: state.emulatorsInCellar.delete(state.emulatorsInCellar.indexOf(action.payload))
      }
    default:
      return state
  }
}
