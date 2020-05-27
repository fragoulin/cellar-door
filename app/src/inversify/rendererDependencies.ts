import { rendererContainer } from './rendererInversify.config'
import { TYPES } from './types'
import { EmulatorsService } from '../services/emulators-service'
import { LocalStorageService } from '../services/local-storage-service'

/**
 * Emulators service.
 */
export const emulatorsService = rendererContainer.get<EmulatorsService>(
  TYPES.EmulatorsService
)

/**
 * Local storage service.
 */
export const localStorageService = rendererContainer.get<LocalStorageService>(
  TYPES.LocalStorageService
)
