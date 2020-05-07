import { Emulator, EmulatorId } from '../models/emulator/emulator'
import { List } from 'immutable'
import EmulatorClasses from '../models/emulator/emulators'
import { EmulatorIdsToName } from '../store/emulators/types'

export class EmulatorsService {
  private static _instance: EmulatorsService | undefined

  private emulators: List<Emulator> | undefined

  public static getInstance (): EmulatorsService {
    return this._instance || (this._instance = new this())
  }

  public buildAvailableEmulatorNamesList (): List<EmulatorIdsToName> {
    const data: EmulatorIdsToName[] = []

    EmulatorClasses.map(EmulatorClass => {
      const e = new EmulatorClass()
      data.push({
        id: e.Id,
        name: e.shortName
      })
    })

    return List(data)
  }

  public getEmulator (emulatorId: EmulatorId): Emulator | undefined {
    return this.getEmulatorsModels().find(emulatorModel => emulatorId === emulatorModel.Id)
  }

  private getEmulatorsModels (): List<Emulator> {
    if (!this.emulators) {
      this.emulators = List(EmulatorClasses.map(E => new E()))
    }

    return this.emulators
  }
}
