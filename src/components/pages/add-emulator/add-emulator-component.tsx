import * as React from 'react'
import { SignalDispatcher, ISignal } from 'strongly-typed-events'
import { Button } from '@material-ui/core'

export class AddEmulator extends React.PureComponent {
  private _back = new SignalDispatcher()
  private _next = new SignalDispatcher()

  render (): React.ReactNode {
    return (
      <div className="AddEmulator">
        <h1 className="Heading">Add an emulator</h1>
        <p className="body1">Choose an emulator from the following list</p>
        <select>
          <option>Hyperspin</option>
          <option>MAME</option>
          <option>Nebula</option>
          <option>NeoRageX</option>
          <option>ZiNc</option>
        </select>
        <Button onClick={this.back}>Back</Button>
        <Button color="primary" onClick={this.next}>Next</Button>
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
