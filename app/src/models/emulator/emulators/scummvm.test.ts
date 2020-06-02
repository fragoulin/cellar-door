import { EmulatorId } from 'models/emulator/types'
import ScummVm from './scummvm'

it('should have correct Id', () => {
  expect(ScummVm.Id).toBe(EmulatorId.ScummVM)
})

it('should have correct short name', () => {
  expect(ScummVm.shortName).toBe('ScummVM')
})

it('should have correct full name', () => {
  expect(ScummVm.fullName).toBe(
    'Script Creation Utility for Maniac Mansion Virtual Machine'
  )
})

it('should have correct description', () => {
  expect(ScummVm.description).toBe(
    'ScummVM is a program which allows you to run certain classic graphical point-and-click adventure games and role-playing games, provided you already have their data files. The clever part about this: ScummVM just replaces the executables shipped with the games, allowing you to play them on systems for which they were never designed!'
  )
})

it('should have correct URL', () => {
  expect(ScummVm.URL).toBe('https://www.scummvm.org/')
})

it('should have correct configuration', () => {
  expect(ScummVm.configuration).toHaveLength(2)
  expect(ScummVm.configuration[0].name).toBe('scummvmDirectory')
  expect(ScummVm.configuration[0].value).toBeUndefined()
  expect(ScummVm.configuration[0].mandatory).toBe(true)
  expect(ScummVm.configuration[1].name).toBe('gamesDirectory')
  expect(ScummVm.configuration[1].value).toBeUndefined()
  expect(ScummVm.configuration[1].mandatory).toBe(true)
})

it('should have correct licences', () => {
  expect(ScummVm.licences).toHaveLength(1)
  if (ScummVm.licences) {
    expect(ScummVm.licences[0].spdx).toBe('GPL-2.0')
    expect(ScummVm.licences[0].name).toBe(
      'GNU General Public License version 2'
    )
    expect(ScummVm.licences[0].URL).toBe(
      'https://opensource.org/licenses/GPL-2.0'
    )
  }
})
