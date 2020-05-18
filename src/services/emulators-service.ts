import { Emulator, EmulatorId } from '../models/emulator/types'
import Emulators from '../models/emulator/emulators'
import { EmulatorIdsToName } from '../redux/modules/emulators'
import { cloneDeep } from 'lodash'

export function buildAvailableEmulatorNamesList (): EmulatorIdsToName[] {
  const data: EmulatorIdsToName[] = []

  Emulators.map(emulator => {
    data.push({
      id: emulator.Id,
      name: emulator.shortName
    })
  })

  return data
}

export function getEmulators (): Emulator[] {
  return cloneDeep(Emulators)
}

export function getEmulator (emulatorId: EmulatorId): Emulator | undefined {
  const emulator = getEmulators().find(emulator => emulatorId === emulator.Id)
  if (!emulator) {
    return undefined
  } else {
    return cloneDeep(emulator)
  }
}
