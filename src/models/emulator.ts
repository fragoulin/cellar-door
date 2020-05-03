export class Emulator {
  public Id: string
  public shortName: string
  public fullName?: string
  public description?: string
  public URL?: string

  constructor (Id: string, shortName: string) {
    this.Id = Id
    this.shortName = shortName
  }
}
