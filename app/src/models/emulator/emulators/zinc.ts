import {
  EmulatorId,
  Emulator,
  EmulatorConfiguration,
} from 'models/emulator/types'
import icon from 'resources/icons/emulators/zinc.svg'

/**
 * Directory containing ZiNc executable.
 */
const zincDirectory: EmulatorConfiguration = {
  name: 'zincDirectory',
  mandatory: true,
}

/**
 * Directory containing ZiNc roms.
 */
const romsDirectory: EmulatorConfiguration = {
  name: 'romsDirectory',
  mandatory: true,
}

/**
 * ZiNc emulator definition.
 */
const Zinc: Emulator = {
  Id: EmulatorId.ZiNc,
  shortName: 'ZiNc',
  description:
    'ZiNc is a command line emulator that focuses in emulating the ZN1, ZN2 and System 11 arcade hardware which are based on Playstation hardware.',
  URL: 'http://www.emulator-zone.com/doc.php/arcade/zinc.html',
  icon: icon,
  configuration: [zincDirectory, romsDirectory],
}

/**
 * ZiNc emulator.
 */
export default Zinc
