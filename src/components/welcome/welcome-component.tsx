import * as React from 'react'
import { SignalDispatcher, ISignal } from 'strongly-typed-events'
import { Button } from 'antd'
import './Welcome.css'

export class Welcome extends React.Component {
  private _addEmulator = new SignalDispatcher()

  render (): React.ReactNode {
    return (
      <div className="Welcome">
        <h1>Welcome to Cellar door!</h1>
        <p>Fresh installation detected. You can configure your first emulator by clicking on the following button:</p>
        <Button type="primary" onClick={this.addEmulator}>Add emulator</Button>
      </div>
    )
  }

  public get onAddEmulator (): ISignal {
    return this._addEmulator.asEvent()
  }

  private addEmulator = (): void => {
    this._addEmulator.dispatch()
  }
}
