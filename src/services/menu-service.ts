import { Menu, App, BrowserWindow } from 'electron'
import darwinTemplate from '../electron/menus/darwinMenu'
import otherTemplate from '../electron/menus/otherMenu'
import { injectable } from 'inversify'

const isMac = process.platform === 'darwin'

/**
 * Menu service definition.
 */
export interface MenuService {
  buildMenu(app: App, win: BrowserWindow): Menu
}

/**
 * Cellar implementation of menu service.
 */
@injectable()
export class CellarMenuService implements MenuService {
  public buildMenu(app: App, win: BrowserWindow): Menu {
    if (isMac) return Menu.buildFromTemplate(darwinTemplate(app, win))
    return Menu.buildFromTemplate(otherTemplate(app, win))
  }
}
