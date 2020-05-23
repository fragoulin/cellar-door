import { rendererContainer } from './rendererInversify.config'
import { TYPES } from './services/types'
import { EmulatorsService } from './services/emulators-service'
import { LocaleService } from './services/locale-service'

/**
 * Emulators service.
 */
export const emulatorsService = rendererContainer.get<EmulatorsService>(
  TYPES.EmulatorsService
)

/**
 * Locale service.
 */
export const localeService = rendererContainer.get<LocaleService>(
  TYPES.LocaleService
)
