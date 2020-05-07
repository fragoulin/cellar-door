import { CellarActionTypes, CREATE_CELLAR, CLOSE_CELLAR } from './types'

export function createCellar (): CellarActionTypes {
  return {
    type: CREATE_CELLAR
  }
}

export function closeCellar (): CellarActionTypes {
  return {
    type: CLOSE_CELLAR
  }
}
