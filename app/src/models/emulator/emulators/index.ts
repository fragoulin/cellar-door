import Mame from 'emulators/mame/model'
import ScummVm from 'emulators/scummvm/model'
import Zinc from 'emulators/zinc/model'
import _ from 'lodash'

/**
 * Array of available emulators.
 */
export default [_.cloneDeep(Mame), _.cloneDeep(ScummVm), _.cloneDeep(Zinc)]
