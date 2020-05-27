import { Container } from 'inversify'
import { TYPES } from './types'
import { EmulatorsService } from '../services/emulators-service'
import { LocalStorageService } from '../services/local-storage-service'

/**
 * Inversify container for renderer process.
 */
const rendererContainer = new Container()

rendererContainer
  .bind<EmulatorsService>(TYPES.EmulatorsService)
  .to(EmulatorsService)

rendererContainer
  .bind<LocalStorageService>(TYPES.LocalStorageService)
  .to(LocalStorageService)

export { rendererContainer }
