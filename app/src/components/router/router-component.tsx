import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Welcome from '../../container/cellar/welcome'
import AddEmulator from '../../container/emulators/add-emulator'
import ConfigureEmulator from '../../container/emulators/configure-emulator'
import CreateEmulator from '../../container/emulators/create-emulator'

// Router component
export class Router extends React.PureComponent {
  render(): React.ReactNode {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/add-emulator/" component={AddEmulator} />
          <Route path="/configure-emulator/" component={ConfigureEmulator} />
          <Route path="/create-emulator/" component={CreateEmulator} />
          <Route path="/" component={Welcome} />
        </Switch>
      </BrowserRouter>
    )
  }
}
