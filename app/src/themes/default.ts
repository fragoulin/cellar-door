import { ThemeOptions } from '@material-ui/core'

const theme = (darkMode: boolean): ThemeOptions => {
  return {
    palette: {
      type: darkMode ? 'dark' : 'light',
    },
  }
}

export default theme
