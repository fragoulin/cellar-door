import * as React from 'react'
import { SignalDispatcher, ISignal } from 'strongly-typed-events'

export class AddEmulator extends React.Component {
  private _back = new SignalDispatcher()
  private _next = new SignalDispatcher()

  render (): React.ReactNode {
    return (
      <div>
        <h1>Add an emulator</h1>
        <p>Choose an emulator from the following list</p>
        <select>
          <option>Hyperspin</option>
          <option>MAME</option>
          <option>Nebula</option>
          <option>NeoRageX</option>
          <option>ZiNc</option>
        </select>
        <button onClick={this.back}>Back</button>
        <button onClick={this.next}>Next</button>
      </div>
    )
  }

  public get onBack (): ISignal {
    return this._back.asEvent()
  }

  public get onNext (): ISignal {
    return this._next.asEvent()
  }

  private back = (): void => {
    this._back.dispatch()
  }

  private next = (): void => {
    this._next.dispatch()
  }
}
