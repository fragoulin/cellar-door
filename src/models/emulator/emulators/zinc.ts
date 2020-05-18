import { EmulatorId, Emulator, EmulatorConfiguration } from '../types'

const zincDirectory: EmulatorConfiguration = {
  name: 'zincDirectory',
  mandatory: true
}

const romsDirectory: EmulatorConfiguration = {
  name: 'romsDirectory',
  mandatory: true
}

const Zinc: Emulator = {
  Id: EmulatorId.ZiNc,
  shortName: 'ZiNc',
  description: 'ZiNc is a command line emulator that focuses in emulating the ZN1, ZN2 and System 11 arcade hardware which are based on Playstation hardware.',
  URL: 'http://www.emulator-zone.com/doc.php/arcade/zinc.html',
  configurations: [zincDirectory, romsDirectory]
}

export default Zinc
