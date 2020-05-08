import { EmulatorsState, EmulatorsActionTypes, CREATE_EMULATOR, ADD_EMULATOR_TO_CELLAR, BUILD_AVAILABLE_EMULATOR_NAMES_LIST, REMOVE_EMULATOR_FROM_CELLAR, SET_WIZARD_STATUS, SET_SELECTED_EMULATOR_ID, UPDATE_EMULATOR_CONFIGURATION } from './types'
import { List } from 'immutable'
import * as EmulatorsService from '../../services/emulators-service'

const initialState: EmulatorsState = {
  availableEmulatorNames: List(),
  wizard: {
    hasError: false,
    selectedEmulatorId: undefined,
    emulatorCurrentlyConfigured: undefined
  },
  emulatorsInCellar: List()
}

export function emulatorsReducer (
  state = initialState,
  action: EmulatorsActionTypes
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
          selectedEmulatorId: action.emulatorId
        },
        emulatorsInCellar: state.emulatorsInCellar
      }
    case SET_WIZARD_STATUS:
      return {
        availableEmulatorNames: state.availableEmulatorNames,
        wizard: {
          hasError: action.error,
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
          emulatorCurrentlyConfigured: EmulatorsService.getEmulator(action.emulatorId)
        },
        emulatorsInCellar: state.emulatorsInCellar
      }
    case UPDATE_EMULATOR_CONFIGURATION:
      if (state.wizard.emulatorCurrentlyConfigured) {
        state.wizard.emulatorCurrentlyConfigured.configurations = action.configurations
      }

      return {
        availableEmulatorNames: state.availableEmulatorNames,
        wizard: {
          hasError: state.wizard.hasError,
          selectedEmulatorId: state.wizard.selectedEmulatorId,
          emulatorCurrentlyConfigured: state.wizard.emulatorCurrentlyConfigured
        },
        emulatorsInCellar: state.emulatorsInCellar
      }
    case ADD_EMULATOR_TO_CELLAR:
      return {
        availableEmulatorNames: state.availableEmulatorNames,
        wizard: state.wizard,
        emulatorsInCellar: state.emulatorsInCellar.push(action.emulator)
      }
    case REMOVE_EMULATOR_FROM_CELLAR:
      return {
        availableEmulatorNames: state.availableEmulatorNames,
        wizard: state.wizard,
        emulatorsInCellar: state.emulatorsInCellar.delete(state.emulatorsInCellar.indexOf(action.emulator))
      }
    default:
      return state
  }
}
