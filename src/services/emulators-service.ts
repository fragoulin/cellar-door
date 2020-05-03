import { Emulator } from '../models/emulator'
import { plainToClass } from 'class-transformer'
import { List } from 'immutable'

export class EmulatorsService {
  private static _instance: EmulatorsService | undefined

  public static getInstance (): EmulatorsService {
    return this._instance || (this._instance = new this())
  }

  public getEmulators (): List<Emulator> {
    const mame = require('../../resources/emulators/mame.json')
    const scummvm = require('../../resources/emulators/scummvm.json')
    const zinc = require('../../resources/emulators/zinc.json')

    return List(plainToClass(Emulator, [mame, scummvm, zinc]))
  }

  public getEmulator (emulatorId: string): Emulator | undefined {
    const emulators = this.getEmulators()
    return emulators.find(emulator => emulatorId === emulator.Id)
  }
}
