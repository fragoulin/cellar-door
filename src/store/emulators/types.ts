import { List } from 'immutable'
import { Emulator, EmulatorId } from '../../models/emulator/emulator'
import { EmulatorConfiguration } from '../../models/emulator/emulator-configuration'

export const BUILD_AVAILABLE_EMULATOR_NAMES_LIST = 'BUILD_AVAILABLE_EMULATOR_NAMES_LIST'
export const SET_SELECTED_EMULATOR_ID = 'SET_SELECTED_EMULATOR_ID'
export const SET_WIZARD_STATUS = 'SET_WIZARD_STATUS'
export const CREATE_EMULATOR = 'CREATE_EMULATOR'
export const UPDATE_EMULATOR_CONFIGURATION = 'UPDATE_EMULATOR_CONFIGURATION'
export const ADD_EMULATOR_TO_CELLAR = 'ADD_EMULATOR_TO_CELLAR'
export const REMOVE_EMULATOR_FROM_CELLAR = 'REMOVE_EMULATOR_FROM_CELLAR'

export interface EmulatorIdsToName {
  id: EmulatorId;
  name: string;
}

export interface EmulatorsState {
  availableEmulatorNames: List<EmulatorIdsToName>;
  emulatorsInCellar: List<Emulator>;
  wizard: {
    hasError: boolean;
    selectedEmulatorId: EmulatorId | undefined;
    emulatorCurrentlyConfigured: Emulator | undefined;
  };
}

interface BuildAvailableEmulatorNamesList {
  type: typeof BUILD_AVAILABLE_EMULATOR_NAMES_LIST;
}

interface SetWizardStatus {
  type: typeof SET_WIZARD_STATUS;
  error: boolean;
}

interface SetSelectedEmulatorId {
  type: typeof SET_SELECTED_EMULATOR_ID;
  emulatorId: EmulatorId;
}

interface CreateEmulator {
  type: typeof CREATE_EMULATOR;
  emulatorId: EmulatorId;
}

interface UpdateEmulatorConfiguration {
  type: typeof UPDATE_EMULATOR_CONFIGURATION;
  emulatorId: EmulatorId;
  configurations: List<EmulatorConfiguration>;
}

interface AddEmulatorToCellar {
  type: typeof ADD_EMULATOR_TO_CELLAR;
  emulator: Emulator;
}

interface RemoveEmulatorFromCellar {
  type: typeof REMOVE_EMULATOR_FROM_CELLAR;
  emulator: Emulator;
}

export type EmulatorsActionTypes = BuildAvailableEmulatorNamesList | SetWizardStatus | SetSelectedEmulatorId | CreateEmulator | UpdateEmulatorConfiguration | AddEmulatorToCellar | RemoveEmulatorFromCellar
