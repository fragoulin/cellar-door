import { CellarState, CellarActionTypes, CREATE_CELLAR, CLOSE_CELLAR } from './types'
import { Cellar } from '../../models/cellar'

const initialState: CellarState = {
  currentCellar: undefined
}

export function cellarReducer (
  state = initialState,
  action: CellarActionTypes
): CellarState {
  switch (action.type) {
    case CREATE_CELLAR:
      return {
        currentCellar: new Cellar()
      }
    case CLOSE_CELLAR:
      return {
        currentCellar: undefined
      }
    default:
      return state
  }
}
