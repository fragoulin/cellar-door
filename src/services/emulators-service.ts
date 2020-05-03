import { Emulator } from '../models/emulator'
import { plainToClass } from 'class-transformer'
import { List } from 'immutable'
import mame from '../../resources/emulators/mame.json'
import scummvm from '../../resources/emulators/scummvm.json'
import zinc from '../../resources/emulators/zinc.json'

export class EmulatorsService {
  private static _instance: EmulatorsService | undefined

  public static getInstance (): EmulatorsService {
    return this._instance || (this._instance = new this())
  }

  public getEmulators (): List<Emulator> {
    return List(plainToClass(Emulator, [mame, scummvm, zinc]))
  }

  public getEmulator (emulatorId: string): Emulator | undefined {
    const emulators = this.getEmulators()
    return emulators.find(emulator => emulatorId === emulator.Id)
  }
}
