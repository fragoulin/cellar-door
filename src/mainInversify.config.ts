import { Container } from 'inversify'
import { DatabaseService, NedbService } from './services/database-service'
import { TYPES } from './services/types'
import { IpcMainService, CellarIpcMainService } from './services/ipc-main-service'

const mainContainer = new Container()

mainContainer.bind<DatabaseService>(TYPES.DatabaseService).to(NedbService)
mainContainer.bind<IpcMainService>(TYPES.IpcMainService).to(CellarIpcMainService)

export { mainContainer }
