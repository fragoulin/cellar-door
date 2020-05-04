import { Emulator, EmulatorId } from '../models/emulator/emulator'
import { List } from 'immutable'
import emulators from '../models/emulator/emulators'

export class EmulatorsService {
  private static _instance: EmulatorsService | undefined

  public static getInstance (): EmulatorsService {
    return this._instance || (this._instance = new this())
  }

  public getEmulators (): List<Emulator> {
    return List(emulators.map(E => new E()))
  }

  public getEmulator (emulatorId: EmulatorId): Emulator | undefined {
    return this.getEmulators().find(emulator => emulatorId === emulator.Id)
  }
}
