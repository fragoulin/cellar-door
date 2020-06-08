import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Welcome from 'container/cellar/welcome'
import AddEmulator from 'container/emulators/add-emulator'
import ConfigureEmulator from 'container/emulators/configure-emulator'
import CreateEmulator from 'container/emulators/create-emulator'
import EmulatorMain from 'components/cellar/emulator-main/emulator-main-component'

/**
 * This component handles routes.
 */
export class Router extends React.PureComponent {
  render(): React.ReactNode {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/add-emulator/" component={AddEmulator} />
          <Route path="/configure-emulator/:id" component={ConfigureEmulator} />
          <Route path="/create-emulator/" component={CreateEmulator} />
          <Route path="/emulator/:id" component={EmulatorMain} />
          <Route path="/" component={Welcome} />
        </Switch>
      </BrowserRouter>
    )
  }
}
