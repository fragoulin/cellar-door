import { Cellar } from '../../models/cellar'
import { createSlice } from '@reduxjs/toolkit'
import { localeService } from '../../rendererDependencies'

/**
 * Cellar state definition.
 */
interface CellarState {
  currentCellar: Cellar | undefined
  i18n: {
    currentLocale: string
    availableLocales: string[]
  }
}

/**
 * Initial state for cellar state.
 */
const initialState: CellarState = {
  currentCellar: undefined,
  i18n: {
    currentLocale: localeService.getDefaultLocale(),
    availableLocales: [],
  },
}

/**
 * Redux slice for cellar store.
 */
const cellarSlice = createSlice({
  name: 'cellar',
  initialState: initialState,
  reducers: {
    cellarCreated(state): void {
      state.currentCellar = {}
    },
    cellarClosed(state): void {
      state.currentCellar = undefined
    },
    currentLocaleSet(state, action): void {
      state.i18n = action.payload
    },
  },
})

/**
 * Cellar actions.
 */
export const {
  cellarCreated,
  cellarClosed,
  currentLocaleSet,
} = cellarSlice.actions

/**
 * Cellar reducer.
 */
export default cellarSlice.reducer
