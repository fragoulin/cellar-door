import { Menu, App } from 'electron'
import darwinTemplate from '../electron/menus/darwinMenu'
import otherTemplate from '../electron/menus/otherMenu'
import { injectable } from 'inversify'

const isMac = process.platform === 'darwin'

/**
 * Menu service definition.
 */
export interface MenuService {
  buildMenu(app: App): Menu
}

/**
 * Cellar implementation of menu service.
 */
@injectable()
export class CellarMenuService implements MenuService {
  public buildMenu(app: App): Menu {
    if (isMac) return Menu.buildFromTemplate(darwinTemplate(app))
    return Menu.buildFromTemplate(otherTemplate(app))
  }
}
