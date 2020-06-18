import Emulators from 'models/emulator/emulators'
import { EmulatorId, EmulatorConfiguration } from 'models/emulator/types'
import MAME from 'emulators/mame/model'
import ScummVM from 'emulators/scummvm/model'
import ZiNc from 'emulators/zinc/model'
import {
  buildAvailableEmulatorNamesList,
  getEmulator,
  getEmulators,
  updateConfiguration,
} from 'services/emulators-service'

it('should build available emulators names list', () => {
  const listToTest = buildAvailableEmulatorNamesList()
  Emulators.forEach((emulator) => {
    expect(listToTest).toContainEqual({
      id: emulator.Id,
      name: emulator.shortName,
    })
  })
})

it('should get emulators cloned', () => {
  const emulators = getEmulators()
  expect(emulators).toEqual(Emulators)
  expect(emulators).not.toBe(Emulators)
})

it('should get MAME emulator cloned', () => {
  const emulator = getEmulator(EmulatorId.MAME)
  expect(emulator).toEqual(MAME)
  expect(emulator).not.toBe(MAME)
})

it('should get ScummVM emulator cloned', () => {
  const emulator = getEmulator(EmulatorId.ScummVM)
  expect(emulator).toEqual(ScummVM)
  expect(emulator).not.toBe(ScummVM)
})

it('should get ZiNc emulator cloned', () => {
  const emulator = getEmulator(EmulatorId.ZiNc)
  expect(emulator).toEqual(ZiNc)
  expect(emulator).not.toBe(ZiNc)
})

it('should get unknown emulator', () => {
  const emulator = getEmulator(EmulatorId.Unknown)
  expect(emulator).toBeUndefined()
})

it('should correctly update configuration with an empty array', () => {
  const emulator = getEmulator(EmulatorId.MAME)
  const configurationToUpdate: EmulatorConfiguration[] = []
  if (emulator) {
    emulator.configuration = configurationToUpdate
    const configuration: EmulatorConfiguration = {
      name: 'testName',
      value: 'testValue',
      mandatory: true,
    }
    const newConfiguration = updateConfiguration(emulator, configuration)
    expect(newConfiguration).toHaveLength(1)
    expect(newConfiguration[0]).toEqual(configuration)
    expect(newConfiguration[0]).not.toBe(configuration)
  }
})

it('should correctly update configuration with a non-empty array (1st position)', () => {
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

  const configuration: EmulatorConfiguration[] = [configToReplace, config1]

  const newConfiguration: EmulatorConfiguration = {
    name: 'testName',
    value: 'testValue2',
    mandatory: true,
  }

  const emulator = getEmulator(EmulatorId.MAME)
  if (emulator) {
    emulator.configuration = configuration
    const newConfigurations = updateConfiguration(emulator, newConfiguration)

    expect(newConfigurations).toHaveLength(2)
    expect(newConfigurations[0]).toEqual(newConfiguration)
    expect(newConfigurations[0]).not.toBe(newConfiguration)
    expect(newConfigurations[1]).toEqual(config1)
    expect(newConfigurations[1]).not.toBe(config1)
  }
})

it('should correctly update configuration with a non-empty array (2nd position)', () => {
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

  const configuration: EmulatorConfiguration[] = [config1, configToReplace]

  const newConfiguration: EmulatorConfiguration = {
    name: 'testName',
    value: 'testValue2',
    mandatory: true,
  }

  const emulator = getEmulator(EmulatorId.MAME)
  if (emulator) {
    emulator.configuration = configuration
    const newConfigurations = updateConfiguration(emulator, newConfiguration)

    expect(newConfigurations).toHaveLength(2)
    expect(newConfigurations[0]).toEqual(config1)
    expect(newConfigurations[0]).not.toBe(config1)
    expect(newConfigurations[1]).toEqual(newConfiguration)
    expect(newConfigurations[1]).not.toBe(newConfiguration)
  }
})
