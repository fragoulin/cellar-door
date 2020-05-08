import { CellarActionTypes, CREATE_CELLAR, CLOSE_CELLAR, SET_CURRENT_LOCALE } from './types'

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

export function setCurrentLocale (locale: string): CellarActionTypes {
  return {
    type: SET_CURRENT_LOCALE,
    locale: locale
  }
}
