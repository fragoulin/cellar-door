import { Emulator, EmulatorId } from '../models/emulator/types'
import Emulators from '../models/emulator/emulators'
import { EmulatorIdsToName } from '../redux/modules/emulators'
import { cloneDeep } from 'lodash'
import { injectable } from 'inversify'
import 'reflect-metadata'

export interface EmulatorsService {
  buildAvailableEmulatorNamesList (): EmulatorIdsToName[];
  getEmulators (): Emulator[];
  getEmulator (emulatorId: EmulatorId): Emulator | undefined;
}

@injectable()
export class CellarEmulatorsService implements EmulatorsService {
  public buildAvailableEmulatorNamesList (): EmulatorIdsToName[] {
    const data: EmulatorIdsToName[] = []

    Emulators.map(emulator => {
      data.push({
        id: emulator.Id,
        name: emulator.shortName
      })
    })

    return data
  }

  public getEmulators (): Emulator[] {
    return cloneDeep(Emulators)
  }

  public getEmulator (emulatorId: EmulatorId): Emulator | undefined {
    const emulator = this.getEmulators().find(emulator => emulatorId === emulator.Id)
    if (!emulator) {
      return undefined
    } else {
      return cloneDeep(emulator)
    }
  }
}
