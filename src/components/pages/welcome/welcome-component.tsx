import * as React from 'react'
import { SignalDispatcher, ISignal } from 'strongly-typed-events'
import { Button } from '@material-ui/core'
import './Welcome.css'

export class Welcome extends React.PureComponent {
  private _addEmulator = new SignalDispatcher()

  render (): React.ReactNode {
    return (
      <div className="Welcome">
        <h1 className="Heading">Welcome to Cellar door!</h1>
        <p className="body1">Fresh installation detected. You can configure your first emulator by clicking on the following button:</p>
        <Button color="primary" onClick={this.addEmulator}>Add emulator</Button>
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
