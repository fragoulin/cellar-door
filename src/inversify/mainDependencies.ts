import { mainContainer } from './mainInversify.config'
import { TYPES } from './types'
import { DatabaseService } from '../services/database-service'
import { IpcMainService } from '../services/ipc-main-service'
import { MenuService } from '../services/menu-service'

/**
 * Database service.
 */
export const databaseService = mainContainer.get<DatabaseService>(
  TYPES.DatabaseService
)

/**
 * IPC main service.
 */
export const ipcMainService = mainContainer.get<IpcMainService>(
  TYPES.IpcMainService
)

/**
 * Menu service.
 */
export const menuService = mainContainer.get<MenuService>(TYPES.MenuService)
