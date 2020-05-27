import { mainContainer } from './mainInversify.config'
import { TYPES } from './types'
import { IpcMainService } from '../services/ipc-main-service'

/**
 * IPC main service.
 */
export const ipcMainService = mainContainer.get<IpcMainService>(
  TYPES.IpcMainService
)
