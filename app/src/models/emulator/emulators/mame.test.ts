import Mame from './mame'
import { EmulatorId } from '../types'

it('should have correct Id', () => {
  expect(Mame.Id).toBe(EmulatorId.MAME)
})

it('should have correct short name', () => {
  expect(Mame.shortName).toBe('MAME')
})

it('should have correct full name', () => {
  expect(Mame.fullName).toBe('Multiple Arcade Machine Emulator')
})

it('should have correct description', () => {
  expect(Mame.description).toBe(`MAME is a multi-purpose emulation framework.
MAME’s purpose is to preserve decades of software history. As electronic technology continues to rush forward, MAME prevents this important "vintage" software from being lost and forgotten. This is achieved by documenting the hardware and how it functions. The source code to MAME serves as this documentation. The fact that the software is usable serves primarily to validate the accuracy of the documentation (how else can you prove that you have recreated the hardware faithfully?). Over time, MAME (originally stood for Multiple Arcade Machine Emulator) absorbed the sister-project MESS (Multi Emulator Super System), so MAME now documents a wide variety of (mostly vintage) computers, video game consoles and calculators, in addition to the arcade video games that were its initial focus.`)
})

it('should have correct URL', () => {
  expect(Mame.URL).toBe('https://www.mamedev.org/')
})

it('should have correct configuration', () => {
  expect(Mame.configuration).toHaveLength(3)
  expect(Mame.configuration[0].name).toBe('mameDirectory')
  expect(Mame.configuration[0].value).toBeUndefined()
  expect(Mame.configuration[0].mandatory).toBe(true)
  expect(Mame.configuration[1].name).toBe('extrasDirectory')
  expect(Mame.configuration[1].value).toBeUndefined()
  expect(Mame.configuration[1].mandatory).toBe(false)
  expect(Mame.configuration[2].name).toBe('multimediaDirectory')
  expect(Mame.configuration[2].value).toBeUndefined()
  expect(Mame.configuration[2].mandatory).toBe(false)
})

it('should have correct licences', () => {
  expect(Mame.licences).toHaveLength(2)
  if (Mame.licences) {
    expect(Mame.licences[0].spdx).toBe('GPL-2.0')
    expect(Mame.licences[0].name).toBe('GNU General Public License version 2')
    expect(Mame.licences[0].URL).toBe('https://opensource.org/licenses/GPL-2.0')
    expect(Mame.licences[1].spdx).toBe('BSD-3-Clause')
    expect(Mame.licences[1].name).toBe('The 3-Clause BSD License')
    expect(Mame.licences[1].URL).toBe(
      'https://opensource.org/licenses/BSD-3-Clause'
    )
  }
})
