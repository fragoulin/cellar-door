import { BrowserWindow, MenuItem } from 'electron'
import { i18n as I18n } from 'i18next'

// Contains a whitelist of languages for our app
const whitelistMap: Record<string, string> = {
  en: 'English',
  fr: 'Français', // French
}

const Whitelist = (function (): { langs: string[]; buildSubmenu: Function } {
  const keys = Object.keys(whitelistMap)
  const clickFunction = function (channel: string, lng: string, i18n: I18n) {
    return function (_menuItem: MenuItem, browserWindow: BrowserWindow): void {
      i18n.changeLanguage(lng, (error) => error && console.error(error))
      browserWindow.webContents.send(channel, {
        lng,
      })
    }
  }

  return {
    langs: keys,
    buildSubmenu: function (
      channel: string,
      i18n: I18n
    ): Array<{ label: string; click: Function }> {
      const submenu: Array<{ label: string; click: Function }> = []

      keys.forEach((key) => {
        submenu.push({
          label: whitelistMap[key],
          click: clickFunction(channel, key, i18n),
        })
      })

      return submenu
    },
  }
})()

export default Whitelist
