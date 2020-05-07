import { EmulatorId, EmulatorImpl } from '../emulator'
import { EmulatorConfiguration } from '../emulator-configuration'
import { List } from 'immutable'
import { EmulatorLicence } from '../../../models/emulator/emulator-licence'

export class Mame extends EmulatorImpl {
  constructor () {
    super()
    this.Id = EmulatorId.MAME
    this.shortName = 'MAME'
    this.fullName = 'Multiple Arcade Machine Emulator'
    this.description = `MAME is a multi-purpose emulation framework.
MAME’s purpose is to preserve decades of software history. As electronic technology continues to rush forward, MAME prevents this important "vintage" software from being lost and forgotten. This is achieved by documenting the hardware and how it functions. The source code to MAME serves as this documentation. The fact that the software is usable serves primarily to validate the accuracy of the documentation (how else can you prove that you have recreated the hardware faithfully?). Over time, MAME (originally stood for Multiple Arcade Machine Emulator) absorbed the sister-project MESS (Multi Emulator Super System), so MAME now documents a wide variety of (mostly vintage) computers, video game consoles and calculators, in addition to the arcade video games that were its initial focus.`
    this.URL = new URL('https://www.mamedev.org/')

    const mameDirectory = new EmulatorConfiguration('mameDirectory', true)
    const extrasDir = new EmulatorConfiguration('extrasDirectory', false)
    const multimediaDir = new EmulatorConfiguration('multimediaDirectory', false)
    this.configurations = List([mameDirectory, extrasDir, multimediaDir])

    const gpl2: EmulatorLicence = {
      spdx: 'GPL-2.0',
      name: 'GNU General Public License version 2',
      URL: new URL('https://opensource.org/licenses/GPL-2.0')
    }
    const bsd3: EmulatorLicence = {
      spdx: 'BSD-3-Clause',
      name: 'The 3-Clause BSD License',
      URL: new URL('https://opensource.org/licenses/BSD-3-Clause')
    }
    this.licences = List([gpl2, bsd3])
  }
}
