import React from 'react'
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'
import { Welcome } from '../welcome/welcome-component'
import { AddEmulator } from '../add-emulator/add-emulator-component'
import { ConfigureEmulator } from '../configure-emulator/configure-emulator-component'

// Router component
export class Router extends React.PureComponent {
  render (): React.ReactNode {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/add-emulator/" component={AddEmulator}/>
          <Route path="/configure-emulator/:emulatorId" component={ConfigureEmulator}/>
          <Route path="/" component={Welcome}/>
        </Switch>
      </BrowserRouter>
    )
  }
}
