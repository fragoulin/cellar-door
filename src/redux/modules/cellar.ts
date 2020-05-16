import { Cellar } from '../../models/cellar'
import { List } from 'immutable'
import * as LocaleService from '../../services/locale-service'
import { createActionPayload, createAction, ActionsUnion } from '..'

// Actions
export const CREATE = 'cellar/CREATE'
export const CLOSE = 'cellar/CLOSE'
export const SET_CURRENT_LOCALE = 'cellar/SET_CURRENT_LOCALE'

export const CellarActions = {
  create: createAction<typeof CREATE>(CREATE),
  close: createAction<typeof CLOSE>(CLOSE),
  setCurrentLocale: createActionPayload<typeof SET_CURRENT_LOCALE, string>(SET_CURRENT_LOCALE)
}

// State
interface CellarState {
  currentCellar: Cellar | undefined;
  i18n: {
    currentLocale: string;
    availableLocales: List<string>;
  };
}

const initialState: CellarState = {
  currentCellar: undefined,
  i18n: {
    currentLocale: LocaleService.DEFAULT_LOCALE,
    availableLocales: List()
  }
}

// Reducer
export function cellarReducer (
  state: CellarState = initialState,
  action: ActionsUnion<typeof CellarActions>): CellarState {
  switch (action.type) {
    case CREATE:
      return {
        currentCellar: new Cellar(),
        i18n: state.i18n
      }
    case CLOSE:
      return {
        currentCellar: undefined,
        i18n: state.i18n
      }
    case SET_CURRENT_LOCALE: {
      return {
        currentCellar: state.currentCellar,
        i18n: {
          currentLocale: action.payload,
          availableLocales: state.i18n.availableLocales
        }
      }
    }
    default:
      return state
  }
}
