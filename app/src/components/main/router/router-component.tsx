import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Welcome from 'container/cellar/welcome'
import EmulatorStepper from 'components/emulator/stepper/emulator-stepper-component'
import ConfigureEmulator from 'container/emulators/configure-emulator'
import CreateEmulator from 'container/emulators/create-emulator'
import EmulatorMain from 'components/cellar/emulator-main/emulator-main-component'
import Appbar from 'container/main/appbar'

/**
 * This component handles routes.
 */
export class Router extends React.PureComponent {
  render(): React.ReactNode {
    return (
      <BrowserRouter>
        <Appbar />
        <Switch>
          <Route path="/add-emulator/" component={EmulatorStepper} />
          <Route path="/configure-emulator/:id" component={ConfigureEmulator} />
          <Route path="/create-emulator/" component={CreateEmulator} />
          <Route path="/emulator/:id" component={EmulatorMain} />
          <Route path="/" component={Welcome} />
        </Switch>
        <footer></footer>
      </BrowserRouter>
    )
  }
}
