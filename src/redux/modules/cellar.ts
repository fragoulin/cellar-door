import { Cellar } from '../../models/cellar'
import * as LocaleService from '../../services/locale-service'
import { createSlice } from '@reduxjs/toolkit'

// State
interface CellarState {
  currentCellar: Cellar | undefined;
  i18n: {
    currentLocale: string;
    availableLocales: string[];
  };
}

const initialState: CellarState = {
  currentCellar: undefined,
  i18n: {
    currentLocale: LocaleService.DEFAULT_LOCALE,
    availableLocales: []
  }
}

const cellarSlice = createSlice({
  name: 'cellar',
  initialState: initialState,
  reducers: {
    createCellar (state): void {
      state.currentCellar = {}
    },
    closeCellar (state): void {
      state.currentCellar = undefined
    },
    setCurrentLocale (state, action): void {
      state.i18n = action.payload
    }
  }
})

export const { createCellar, closeCellar, setCurrentLocale } = cellarSlice.actions
export default cellarSlice.reducer
