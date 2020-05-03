import { EmulatorId, EmulatorImpl } from '../models/emulator/emulator'
import { EmulatorConfiguration } from '../models/emulator/emulator-configuration'
import { List } from 'immutable'
import { EmulatorLicence } from '../models/emulator/emulator-licence'

export class ScummVm extends EmulatorImpl {
  constructor () {
    super()
    this.Id = EmulatorId.ScummVM
    this.shortName = 'ScummVM'
    this.fullName = 'Script Creation Utility for Maniac Mansion Virtual Machine'
    this.description = 'ScummVM is a program which allows you to run certain classic graphical point-and-click adventure games and role-playing games, provided you already have their data files. The clever part about this: ScummVM just replaces the executables shipped with the games, allowing you to play them on systems for which they were never designed!'
    this.URL = new URL('https://www.scummvm.org/')

    const scummvmDirectory = new EmulatorConfiguration('scummvmDirectory', true)
    const gamesDirectory = new EmulatorConfiguration('gamesDirectory', true)
    this.configurations = List([scummvmDirectory, gamesDirectory])

    const gpl2: EmulatorLicence = {
      spdx: 'GPL-2.0',
      name: 'GNU General Public License version 2',
      URL: new URL('https://opensource.org/licenses/GPL-2.0')
    }
    this.licences = List([gpl2])
  }
}
