import { createSlice } from '@reduxjs/toolkit'

/**
 * Preferences state definition.
 */
export type PreferencesState = {
  currentLocale: string
  darkMode: boolean
}

/**
 * Initial state for preferences state.
 */
export const initialState: PreferencesState = {
  currentLocale: 'en',
  darkMode: false,
}

/**
 * Redux slice for preferences store.
 */
const preferencesSlice = createSlice({
  name: 'preferences',
  initialState: initialState,
  reducers: {
    currentLocaleSet(state, action): void {
      state.currentLocale = action.payload
    },
    lightDarkModeToggled(state): void {
      state.darkMode = !state.darkMode
    },
  },
})

/**
 * Preferences actions.
 */
export const {
  currentLocaleSet,
  lightDarkModeToggled,
} = preferencesSlice.actions

/**
 * Preferences reducer.
 */
export default preferencesSlice.reducer
