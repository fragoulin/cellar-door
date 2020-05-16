export class EmulatorConfiguration {
  private _name: string
  private _value: string
  private _mandatory: boolean

  constructor (name: string, mandatory = true, value = '') {
    this._name = name
    this._mandatory = mandatory
    this._value = value
  }

  set name (name: string) {
    this._name = name
  }

  get name (): string {
    return this._name
  }

  set value (value: string) {
    this._value = value
  }

  get value (): string {
    return this._value
  }

  set mandatory (mandatory: boolean) {
    this._mandatory = mandatory
  }

  get mandatory (): boolean {
    return this._mandatory
  }
}
