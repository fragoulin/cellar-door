import {
  Emulator,
  EmulatorId,
  EmulatorConfiguration,
} from '../models/emulator/types'
import Emulators from '../models/emulator/emulators'
import { EmulatorIdsToName } from '../redux/modules/emulators'
import _, { cloneDeep } from 'lodash'
import { injectable } from 'inversify'
import 'reflect-metadata'

/**
 * Emulators service definition.
 */
export interface EmulatorsService {
  /**
   * Build an array containing mapping of emulator Ids to their names.
   */
  buildAvailableEmulatorNamesList(): EmulatorIdsToName[]

  /**
   * Retrieve an array of available emulators.
   *
   * @returns an array of available emulators.
   */
  getEmulators(): Emulator[]

  /**
   * Retrieve a specific emulator from its Id.
   *
   * @param emulatorId - an emulator Id.
   * @returns the emulator matching the specified Id, or undefined.
   */
  getEmulator(emulatorId: EmulatorId): Emulator | undefined

  /**
   * Return new array of emulator configurations updated with specified emulator configuration.
   * If no update, new emulator configuration is added to the new array.
   *
   * @param configurations - array of configurations to update
   * @param newConfiguration - new configuration to insert/update to array
   */
  updateConfiguration(
    configurations: EmulatorConfiguration[],
    newConfiguration: EmulatorConfiguration
  ): EmulatorConfiguration[]
}

/**
 * Cellar implementation for emulators service.
 */
@injectable()
export class CellarEmulatorsService implements EmulatorsService {
  public buildAvailableEmulatorNamesList(): EmulatorIdsToName[] {
    const data: EmulatorIdsToName[] = []

    Emulators.map((emulator) => {
      data.push({
        id: emulator.Id,
        name: emulator.shortName,
      })
    })

    return data
  }

  public getEmulators(): Emulator[] {
    return cloneDeep(Emulators)
  }

  public getEmulator(emulatorId: EmulatorId): Emulator | undefined {
    const emulator = this.getEmulators().find(
      (emulator) => emulatorId === emulator.Id
    )
    if (!emulator) return
    return cloneDeep(emulator)
  }

  public updateConfiguration(
    configurations: EmulatorConfiguration[],
    configuration: EmulatorConfiguration
  ): EmulatorConfiguration[] {
    const newConfigurations = _.cloneDeep(configurations)
    const newConfiguration = _.cloneDeep(configuration)

    const index = newConfigurations.findIndex(
      (configuration) => configuration.name === newConfiguration.name
    )

    if (index === -1) {
      newConfigurations.push(newConfiguration)
    } else {
      newConfigurations[index] = newConfiguration
    }

    return newConfigurations
  }
}
