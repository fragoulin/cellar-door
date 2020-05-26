import { Container } from 'inversify'
import { DatabaseService, NedbService } from '../services/database-service'
import { TYPES } from './types'
import {
  IpcMainService,
  CellarIpcMainService,
} from '../services/ipc-main-service'

/**
 * Inversify container for main process.
 */
const mainContainer = new Container()

mainContainer
  .bind<DatabaseService>(TYPES.DatabaseService)
  .to(NedbService)
  .inSingletonScope()
mainContainer
  .bind<IpcMainService>(TYPES.IpcMainService)
  .to(CellarIpcMainService)

export { mainContainer }
