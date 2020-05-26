import Mame from './mame'
import ScummVm from './scummvm'
import Zinc from './zinc'
import _ from 'lodash'

/**
 * Array of available emulators.
 */
export default [_.cloneDeep(Mame), _.cloneDeep(ScummVm), _.cloneDeep(Zinc)]
