import Emulators from '../models/emulator/emulators'
import { EmulatorId, EmulatorConfiguration } from '../models/emulator/types'
import MAME from '../models/emulator/emulators/mame'
import ScummVM from '../models/emulator/emulators/scummvm'
import ZiNc from '../models/emulator/emulators/zinc'
import { emulatorsService } from '../inversify/rendererDependencies'

it('should build available emulators names list', () => {
  const listToTest = emulatorsService.buildAvailableEmulatorNamesList()
  Emulators.forEach((emulator) => {
    expect(listToTest).toContainEqual({
      id: emulator.Id,
      name: emulator.shortName,
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

it('should correctly update configurations with an empty array', () => {
  const configurations: EmulatorConfiguration[] = []
  const configuration: EmulatorConfiguration = {
    name: 'testName',
    value: 'testValue',
    mandatory: true,
  }
  const newConfigurations = emulatorsService.updateConfiguration(
    configurations,
    configuration
  )

  expect(newConfigurations).toHaveLength(1)
  expect(newConfigurations[0]).toEqual(configuration)
  expect(newConfigurations[0]).not.toBe(configuration)
})

it('should correctly update configurations with a non-empty array (1st position)', () => {
  const configToReplace: EmulatorConfiguration = {
    name: 'testName',
    value: 'testValue1',
    mandatory: false,
  }

  const config1: EmulatorConfiguration = {
    name: 'name',
    value: 'value',
    mandatory: false,
  }

  const configurations: EmulatorConfiguration[] = [configToReplace, config1]

  const newConfiguration: EmulatorConfiguration = {
    name: 'testName',
    value: 'testValue2',
    mandatory: true,
  }

  const newConfigurations = emulatorsService.updateConfiguration(
    configurations,
    newConfiguration
  )

  expect(newConfigurations).toHaveLength(2)
  expect(newConfigurations[0]).toEqual(newConfiguration)
  expect(newConfigurations[0]).not.toBe(newConfiguration)
  expect(newConfigurations[1]).toEqual(config1)
  expect(newConfigurations[1]).not.toBe(config1)
})

it('should correctly update configurations with a non-empty array (2nd position)', () => {
  const configToReplace: EmulatorConfiguration = {
    name: 'testName',
    value: 'testValue1',
    mandatory: false,
  }

  const config1: EmulatorConfiguration = {
    name: 'name',
    value: 'value',
    mandatory: false,
  }

  const configurations: EmulatorConfiguration[] = [config1, configToReplace]

  const newConfiguration: EmulatorConfiguration = {
    name: 'testName',
    value: 'testValue2',
    mandatory: true,
  }

  const newConfigurations = emulatorsService.updateConfiguration(
    configurations,
    newConfiguration
  )

  expect(newConfigurations).toHaveLength(2)
  expect(newConfigurations[0]).toEqual(config1)
  expect(newConfigurations[0]).not.toBe(config1)
  expect(newConfigurations[1]).toEqual(newConfiguration)
  expect(newConfigurations[1]).not.toBe(newConfiguration)
})
