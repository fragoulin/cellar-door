import { EmulatorConfiguration } from './emulator-configuration'
import { List } from 'immutable'
import { EmulatorLicence } from './emulator-licence'

export enum EmulatorId {
  Unknown = '',
  MAME = 'mame',
  ScummVM = 'scummvm',
  ZiNc = 'zinc'
}

export interface Emulator {
  Id: EmulatorId;
  shortName: string;
  fullName?: string;
  description: string;
  URL: URL;
  configurations: List<EmulatorConfiguration>;
  licences: List<EmulatorLicence>;
}

export class EmulatorImpl implements Emulator {
  private _Id: EmulatorId
  private _shortName: string
  private _fullName?: string
  private _description: string
  private _URL: URL
  private _configurations: List<EmulatorConfiguration>
  private _licences: List<EmulatorLicence>

  constructor () {
    this._Id = EmulatorId.Unknown
    this._shortName = ''
    this._description = ''
    this._URL = new URL('https://www.google.com')
    this._configurations = List()
    this._licences = List()
  }

  set Id (Id: EmulatorId) {
    this._Id = Id
  }

  get Id (): EmulatorId {
    return this._Id
  }

  set shortName (shortName: string) {
    this._shortName = shortName
  }

  get shortName (): string {
    return this._shortName
  }

  set fullName (fullName: string | undefined) {
    this._fullName = fullName
  }

  get fullName (): string | undefined {
    return this._fullName
  }

  set description (description: string) {
    this._description = description
  }

  get description (): string {
    return this._description
  }

  set URL (URL: URL) {
    this._URL = URL
  }

  get URL (): URL {
    return this._URL
  }

  set configurations (configurations: List<EmulatorConfiguration>) {
    this._configurations = configurations
  }

  get configurations (): List<EmulatorConfiguration> {
    return this._configurations
  }

  set licences (licences: List<EmulatorLicence>) {
    this._licences = licences
  }

  get licences (): List<EmulatorLicence> {
    return this._licences
  }
}
