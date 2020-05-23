import { Container } from 'inversify'
import { TYPES } from './services/types'
import {
  EmulatorsService,
  CellarEmulatorsService,
} from './services/emulators-service'
import { LocaleService, CellarLocaleService } from './services/locale-service'

/**
 * Inversify container for renderer process.
 */
const rendererContainer = new Container()

rendererContainer
  .bind<EmulatorsService>(TYPES.EmulatorsService)
  .to(CellarEmulatorsService)
rendererContainer
  .bind<LocaleService>(TYPES.LocaleService)
  .to(CellarLocaleService)

export { rendererContainer }
