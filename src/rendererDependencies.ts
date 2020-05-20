import { rendererContainer } from './rendererInversify.config'
import { TYPES } from './services/types'
import { EmulatorsService } from './services/emulators-service'
import { LocaleService } from './services/locale-service'

export const emulatorsService = rendererContainer.get<EmulatorsService>(TYPES.EmulatorsService)
export const localeService = rendererContainer.get<LocaleService>(TYPES.LocaleService)
