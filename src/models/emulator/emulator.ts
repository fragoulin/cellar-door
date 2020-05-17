export enum EmulatorId {
  Unknown = '',
  MAME = 'mame',
  ScummVM = 'scummvm',
  ZiNc = 'zinc'
}

export interface EmulatorConfiguration {
  name: string;
  value?: string;
  mandatory: boolean;
}

export interface EmulatorLicence {
  spdx: string;
  name: string;
  URL: string;
}

export interface Emulator {
  Id: EmulatorId;
  shortName: string;
  fullName?: string;
  description: string;
  URL: string;
  configurations: EmulatorConfiguration[];
  licences?: EmulatorLicence[];
}
