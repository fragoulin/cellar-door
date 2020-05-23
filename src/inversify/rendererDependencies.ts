import { rendererContainer } from './rendererInversify.config'
import { TYPES } from '../services/types'
import { EmulatorsService } from '../services/emulators-service'

/**
 * Emulators service.
 */
export const emulatorsService = rendererContainer.get<EmulatorsService>(
  TYPES.EmulatorsService
)
