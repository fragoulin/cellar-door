import { rendererContainer } from './rendererInversify.config'
import { TYPES } from './types'
import { EmulatorsService } from '../services/emulators-service'

/**
 * Emulators service.
 */
export const emulatorsService = rendererContainer.get<EmulatorsService>(
  TYPES.EmulatorsService
)
