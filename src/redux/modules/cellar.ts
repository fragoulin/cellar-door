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
    cellarCreated (state): void {
      state.currentCellar = {}
    },
    cellarClosed (state): void {
      state.currentCellar = undefined
    },
    currentLocaleSet (state, action): void {
      state.i18n = action.payload
    }
  }
})

export const { cellarCreated, cellarClosed, currentLocaleSet } = cellarSlice.actions
export default cellarSlice.reducer
