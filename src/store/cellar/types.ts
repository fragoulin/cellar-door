import { Cellar } from '../../models/cellar'

export const CREATE_CELLAR = 'CREATE_CELLAR'
export const CLOSE_CELLAR = 'CLOSE_CELLAR'

export interface CellarState {
  currentCellar: Cellar | undefined;
}

interface CreateCellarAction {
  type: typeof CREATE_CELLAR;
}

interface CloseCellarAction {
  type: typeof CLOSE_CELLAR;
}

export type CellarActionTypes = CreateCellarAction | CloseCellarAction
