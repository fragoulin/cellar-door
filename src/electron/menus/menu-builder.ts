import { App, Menu } from 'electron'
import darwinTemplate from './darwinMenu'
import otherTemplate from './otherMenu'

const isMac = process.platform === 'darwin'

export const buildMenu = (app: App): Menu => {
  if (isMac) return Menu.buildFromTemplate(darwinTemplate(app))
  return Menu.buildFromTemplate(otherTemplate(app))
}
