import Emulators from '../models/emulator/emulators'
import { EmulatorId } from '../models/emulator/types'
import MAME from '../models/emulator/emulators/mame'
import ScummVM from '../models/emulator/emulators/scummvm'
import ZiNc from '../models/emulator/emulators/zinc'
import { emulatorsService } from '../rendererDependencies'

it('should build available emulators names list', () => {
  const listToTest = emulatorsService.buildAvailableEmulatorNamesList()
  Emulators.forEach(emulator => {
    expect(listToTest).toContainEqual({
      id: emulator.Id,
      name: emulator.shortName
    })
  })
})

it('should get emulators cloned', () => {
  const emulators = emulatorsService.getEmulators()
  expect(emulators).toEqual(Emulators)
  expect(emulators).not.toBe(Emulators)
})

it('should get MAME emulator cloned', () => {
  const emulator = emulatorsService.getEmulator(EmulatorId.MAME)
  expect(emulator).toEqual(MAME)
  expect(emulator).not.toBe(MAME)
})

it('should get ScummVM emulator cloned', () => {
  const emulator = emulatorsService.getEmulator(EmulatorId.ScummVM)
  expect(emulator).toEqual(ScummVM)
  expect(emulator).not.toBe(ScummVM)
})

it('should get ZiNc emulator cloned', () => {
  const emulator = emulatorsService.getEmulator(EmulatorId.ZiNc)
  expect(emulator).toEqual(ZiNc)
  expect(emulator).not.toBe(ZiNc)
})

it('should get unknown emulator', () => {
  const emulator = emulatorsService.getEmulator(EmulatorId.Unknown)
  expect(emulator).toBeUndefined()
})
