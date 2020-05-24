import { mainContainer } from './mainInversify.config'
import { TYPES } from './types'
import { DatabaseService } from '../services/database-service'
import { IpcMainService } from '../services/ipc-main-service'

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
