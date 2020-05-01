export enum EmulatorId {
  HyperSpin = 'HyperSpin',
  MAME = 'MAME',
  Nebula = 'Nebula',
  NeoRageX = 'NeoRageX',
  ScummVM = 'ScummVM',
  ZiNc = 'ZiNc'
}

export interface Emulator {
  readonly id: EmulatorId;
  readonly name: string;
  description?: string;
  url?: string;
}

export class EmulatorImpl implements Emulator {
  public id: EmulatorId
  public name: string
  public description?: string
  public url?: string

  constructor (id: EmulatorId, name: string) {
    this.id = id
    this.name = name
  }
}
