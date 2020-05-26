import { BrowserWindow, MenuItem } from 'electron'

// Contains a whitelist of languages for our app
const whitelistMap: Record<string, string> = {
  en: 'English',
  fr: 'Français', // French
}

const Whitelist = (function (): { langs: string[]; buildSubmenu: Function } {
  const keys = Object.keys(whitelistMap)
  const clickFunction = function (channel: string, lng: string) {
    return function (_menuItem: MenuItem, browserWindow: BrowserWindow): void {
      browserWindow.webContents.send(channel, {
        lng,
      })
    }
  }

  return {
    langs: keys,
    buildSubmenu: function (
      channel: string
    ): Array<{ label: string; click: Function }> {
      const submenu: Array<{ label: string; click: Function }> = []

      keys.forEach((key) => {
        submenu.push({
          label: whitelistMap[key],
          click: clickFunction(channel, key),
        })
      })

      return submenu
    },
  }
})()

export default Whitelist
