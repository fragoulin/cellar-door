import { CellarState, CellarActionTypes, CREATE_CELLAR, CLOSE_CELLAR, SET_CURRENT_LOCALE } from './types'
import { Cellar } from '../../models/cellar'
import { List } from 'immutable'
import * as LocaleService from '../../services/locale-service'

const initialState: CellarState = {
  currentCellar: undefined,
  i18n: {
    currentLocale: LocaleService.DEFAULT_LOCALE,
    availableLocales: List()
  }
}

export function cellarReducer (
  state = initialState,
  action: CellarActionTypes
): CellarState {
  switch (action.type) {
    case CREATE_CELLAR:
      return {
        currentCellar: new Cellar(),
        i18n: state.i18n
      }
    case CLOSE_CELLAR:
      return {
        currentCellar: undefined,
        i18n: state.i18n
      }
    case SET_CURRENT_LOCALE: {
      return {
        currentCellar: state.currentCellar,
        i18n: {
          currentLocale: action.locale,
          availableLocales: state.i18n.availableLocales
        }
      }
    }
    default:
      return state
  }
}
