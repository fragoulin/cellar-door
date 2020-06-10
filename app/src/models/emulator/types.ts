/**
 * Ids for available emulators.
 */
export enum EmulatorId {
  Unknown = '',
  MAME = 'mame',
  ScummVM = 'scummvm',
  ZiNc = 'zinc',
}

/**
 * Emulator configuration.
 */
export interface EmulatorConfiguration {
  name: string
  value?: string
  mandatory: boolean
}

/**
 * Emulator license.
 */
export interface EmulatorLicense {
  spdx: string
  name: string
  URL: string
}

/**
 * Emulator.
 */
export interface Emulator {
  Id: EmulatorId
  shortName: string
  fullName?: string
  description: string
  logo?: string
  icon: string
  URL: string
  licences?: EmulatorLicense[]
  configuration: EmulatorConfiguration[]
}
