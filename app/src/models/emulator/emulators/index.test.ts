import Emulators from './index'
import Mame from 'emulators/mame/model'
import ScummVm from 'emulators/scummvm/model'
import Zinc from 'emulators/zinc/model'

it('should contains correct number of emulators', () => {
  expect(Emulators).toHaveLength(3)
})

it('should contain MAME emulator (cloned)', () => {
  expect(Emulators[0]).toEqual(Mame)
  expect(Emulators[0]).not.toBe(Mame)
})

it('should contain ScummVm emulator (cloned)', () => {
  expect(Emulators[1]).toEqual(ScummVm)
  expect(Emulators[1]).not.toBe(ScummVm)
})

it('should contain Zinc emulator (cloned)', () => {
  expect(Emulators[2]).toEqual(Zinc)
  expect(Emulators[2]).not.toBe(Zinc)
})
