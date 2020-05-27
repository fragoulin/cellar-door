import { Container } from 'inversify'
import { TYPES } from './types'
import { IpcMainService } from '../services/ipc-main-service'

/**
 * Inversify container for main process.
 */
const mainContainer = new Container()

mainContainer.bind<IpcMainService>(TYPES.IpcMainService).to(IpcMainService)

export { mainContainer }
