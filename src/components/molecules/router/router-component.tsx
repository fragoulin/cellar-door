import React from 'react'
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'
import { Welcome } from '../../pages/welcome/welcome-component'
import { AddEmulator } from '../../pages/add-emulator/add-emulator-component'
import { ConfigureEmulator } from '../../organisms/configure-emulator/configure-emulator-component'

// Router component
export class Router extends React.PureComponent {
  render (): React.ReactNode {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/add-emulator/:emulator?" component={AddEmulator}/>
          <Route path="/configure-emulator/:emulator" component={ConfigureEmulator}/>
          <Route path="/" component={Welcome}/>
        </Switch>
      </BrowserRouter>
    )
  }
}
