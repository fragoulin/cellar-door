import { Cellar } from '../../models/cellar'
import { List } from 'immutable'

export const CREATE_CELLAR = 'CREATE_CELLAR'
export const CLOSE_CELLAR = 'CLOSE_CELLAR'
export const SET_CURRENT_LOCALE = 'SET_CURRENT_LOCALE'

export interface CellarState {
  currentCellar: Cellar | undefined;
  i18n: {
    currentLocale: string;
    availableLocales: List<string>;
  };
}

interface CreateCellarAction {
  type: typeof CREATE_CELLAR;
}

interface CloseCellarAction {
  type: typeof CLOSE_CELLAR;
}

interface SetCurrentLocaleAction {
  type: typeof SET_CURRENT_LOCALE;
  locale: string;
}

export type CellarActionTypes = CreateCellarAction | CloseCellarAction | SetCurrentLocaleAction
