import { Emulator, EmulatorId } from '../models/emulator/emulator'
import { List } from 'immutable'
import EmulatorClasses from '../models/emulator/emulators'
import { EmulatorIdsToName } from '../store/emulators/types'

export function buildAvailableEmulatorNamesList (): List<EmulatorIdsToName> {
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

export function getEmulatorsModels (): List<Emulator> {
  return List(EmulatorClasses.map(E => new E()))
}

export function getEmulator (emulatorId: EmulatorId): Emulator | undefined {
  return getEmulatorsModels().find(emulatorModel => emulatorId === emulatorModel.Id)
}
