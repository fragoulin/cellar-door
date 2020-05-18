import { EmulatorId, EmulatorLicence, Emulator, EmulatorConfiguration } from '../types'

const mameDirectory: EmulatorConfiguration = {
  name: 'mameDirectory',
  mandatory: true
}

const extrasDir: EmulatorConfiguration = {
  name: 'extrasDirectory',
  mandatory: false
}

const multimediaDir: EmulatorConfiguration = {
  name: 'multimediaDirectory',
  mandatory: false
}

const gpl2: EmulatorLicence = {
  spdx: 'GPL-2.0',
  name: 'GNU General Public License version 2',
  URL: 'https://opensource.org/licenses/GPL-2.0'
}
const bsd3: EmulatorLicence = {
  spdx: 'BSD-3-Clause',
  name: 'The 3-Clause BSD License',
  URL: 'https://opensource.org/licenses/BSD-3-Clause'
}

const Mame: Emulator = {
  Id: EmulatorId.MAME,
  shortName: 'MAME',
  fullName: 'Multiple Arcade Machine Emulator',
  description: `MAME is a multi-purpose emulation framework.
MAME’s purpose is to preserve decades of software history. As electronic technology continues to rush forward, MAME prevents this important "vintage" software from being lost and forgotten. This is achieved by documenting the hardware and how it functions. The source code to MAME serves as this documentation. The fact that the software is usable serves primarily to validate the accuracy of the documentation (how else can you prove that you have recreated the hardware faithfully?). Over time, MAME (originally stood for Multiple Arcade Machine Emulator) absorbed the sister-project MESS (Multi Emulator Super System), so MAME now documents a wide variety of (mostly vintage) computers, video game consoles and calculators, in addition to the arcade video games that were its initial focus.`,
  URL: 'https://www.mamedev.org/',
  configurations: [mameDirectory, extrasDir, multimediaDir],
  licences: [gpl2, bsd3]
}

export default Mame
