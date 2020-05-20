import { mainContainer } from './mainInversify.config'
import { TYPES } from './services/types'
import { DatabaseService } from './services/database-service'
import { IpcMainService } from './services/ipc-main-service'

export const databaseService = mainContainer.get<DatabaseService>(TYPES.DatabaseService)
export const ipcMainService = mainContainer.get<IpcMainService>(TYPES.IpcMainService)
