import { EmulatorId, Emulator } from '../../models/emulator/emulator'
import { EmulatorsActionTypes, CREATE_EMULATOR, ADD_EMULATOR_TO_CELLAR, REMOVE_EMULATOR_FROM_CELLAR, BUILD_AVAILABLE_EMULATOR_NAMES_LIST, SET_SELECTED_EMULATOR_ID, SET_WIZARD_STATUS, UPDATE_EMULATOR_CONFIGURATION } from './types'
import { List } from 'immutable'
import { EmulatorConfiguration } from '../../models/emulator/emulator-configuration'

export function buildAvailableEmulatorNamesList (): EmulatorsActionTypes {
  return {
    type: BUILD_AVAILABLE_EMULATOR_NAMES_LIST
  }
}

export function setWizardStatus (error: boolean): EmulatorsActionTypes {
  return {
    type: SET_WIZARD_STATUS,
    error: error
  }
}

export function setSelectedEmulatorId (emulatorId: EmulatorId): EmulatorsActionTypes {
  return {
    type: SET_SELECTED_EMULATOR_ID,
    emulatorId: emulatorId
  }
}

export function createEmulator (emulatorId: EmulatorId): EmulatorsActionTypes {
  return {
    type: CREATE_EMULATOR,
    emulatorId: emulatorId
  }
}

export function updateEmulatorConfiguration (emulatorId: EmulatorId, configurations: List<EmulatorConfiguration>): EmulatorsActionTypes {
  return {
    type: UPDATE_EMULATOR_CONFIGURATION,
    configurations: configurations,
    emulatorId: emulatorId
  }
}

export function addEmulatorToCellar (emulator: Emulator): EmulatorsActionTypes {
  return {
    type: ADD_EMULATOR_TO_CELLAR,
    emulator: emulator
  }
}

export function removeEmulatorFromCellar (emulator: Emulator): EmulatorsActionTypes {
  return {
    type: REMOVE_EMULATOR_FROM_CELLAR,
    emulator: emulator
  }
}
