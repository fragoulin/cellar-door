import {
  EmulatorId,
  EmulatorLicense,
  Emulator,
  EmulatorConfiguration,
} from 'app/src/models/emulator/types'

/**
 * Directory containing ScummVM executable.
 */
const scummvmDirectory: EmulatorConfiguration = {
  name: 'scummvmDirectory',
  mandatory: true,
}

/**
 * Directory containing ScummVM games.
 */
const gamesDirectory: EmulatorConfiguration = {
  name: 'gamesDirectory',
  mandatory: true,
}

/**
 * GPL2 license.
 */
const gpl2: EmulatorLicense = {
  spdx: 'GPL-2.0',
  name: 'GNU General Public License version 2',
  URL: 'https://opensource.org/licenses/GPL-2.0',
}

/**
 * ScummVM emulator definition.
 */
const ScummVm: Emulator = {
  Id: EmulatorId.ScummVM,
  shortName: 'ScummVM',
  fullName: 'Script Creation Utility for Maniac Mansion Virtual Machine',
  description:
    'ScummVM is a program which allows you to run certain classic graphical point-and-click adventure games and role-playing games, provided you already have their data files. The clever part about this: ScummVM just replaces the executables shipped with the games, allowing you to play them on systems for which they were never designed!',
  URL: 'https://www.scummvm.org/',
  configurations: [scummvmDirectory, gamesDirectory],
  licences: [gpl2],
}

/**
 * ScummVM emulator.
 */
export default ScummVm
