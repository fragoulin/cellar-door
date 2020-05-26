import { Container } from 'inversify'
import { TYPES } from './types'
import {
  EmulatorsService,
  CellarEmulatorsService,
} from '../services/emulators-service'

/**
 * Inversify container for renderer process.
 */
const rendererContainer = new Container()

rendererContainer
  .bind<EmulatorsService>(TYPES.EmulatorsService)
  .to(CellarEmulatorsService)

export { rendererContainer }
