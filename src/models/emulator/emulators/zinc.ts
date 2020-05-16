import { EmulatorId, EmulatorImpl } from '../emulator'
import { EmulatorConfiguration } from '../emulator-configuration'
import { List } from 'immutable'

export default class Zinc extends EmulatorImpl {
  constructor () {
    super()
    this.Id = EmulatorId.ZiNc
    this.shortName = 'ZiNc'
    this.description = 'ZiNc is a command line emulator that focuses in emulating the ZN1, ZN2 and System 11 arcade hardware which are based on Playstation hardware.'
    this.URL = new URL('http://www.emulator-zone.com/doc.php/arcade/zinc.html')

    const zincDirectory = new EmulatorConfiguration('zincDirectory', true)
    const romsDirectory = new EmulatorConfiguration('romsDirectory', true)
    this.configurations = List([zincDirectory, romsDirectory])
  }
}
