import lightTheme from './default-light'
import darkTheme from './default-dark'
import { Theme } from '@material-ui/core'

const themeMap: { [key: string]: Theme } = {
  lightTheme,
  darkTheme,
}

export function getTheme(theme: string): Theme {
  return themeMap[theme]
}
