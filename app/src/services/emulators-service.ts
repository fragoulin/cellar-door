import {
  Emulator,
  EmulatorId,
  EmulatorConfiguration,
} from 'models/emulator/types'
import Emulators from 'models/emulator/emulators'
import { EmulatorIdsToName } from 'redux/modules/cellar'
import { cloneDeep } from 'lodash'

/**
 * Build an array containing mapping of emulator Ids to their names.
 */
function buildAvailableEmulatorNamesList(): EmulatorIdsToName[] {
  const data: EmulatorIdsToName[] = []

  Emulators.map((emulator) => {
    data.push({
      id: emulator.Id,
      name: emulator.shortName,
    })
  })

  return data
}

/**
 * Retrieve an array of available emulators.
 *
 * @returns an array of available emulators.
 */
function getEmulators(): Emulator[] {
  return cloneDeep(Emulators)
}

/**
 * Retrieve a specific emulator from its Id.
 *
 * @param emulatorId - an emulator Id.
 * @returns the emulator matching the specified Id, or undefined.
 */
function getEmulator(emulatorId: EmulatorId): Emulator | undefined {
  const emulator = getEmulators().find((emulator) => emulatorId === emulator.Id)
  if (!emulator) return
  return cloneDeep(emulator)
}

/**
 * Return new array of emulator configuration updated with specified emulator configuration.
 * If no update, new emulator configuration is added to the new array.
 *
 * @param param  - emulator with configuration to update
 * @param newConfiguration - new configuration to insert/update to array
 */
function updateConfiguration(
  emulator: Emulator,
  configuration: EmulatorConfiguration
): EmulatorConfiguration[] {
  const newConfigurationToUpdate = cloneDeep(emulator.configuration)
  const newConfiguration = cloneDeep(configuration)

  const index = newConfigurationToUpdate.findIndex(
    (configuration) => configuration.name === newConfiguration.name
  )

  if (index === -1) {
    newConfigurationToUpdate.push(newConfiguration)
  } else {
    newConfigurationToUpdate[index] = newConfiguration
  }

  return newConfigurationToUpdate
}

export {
  buildAvailableEmulatorNamesList,
  getEmulators,
  getEmulator,
  updateConfiguration,
}
