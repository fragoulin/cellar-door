import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Welcome from 'app/src/container/cellar/welcome'
import AddEmulator from 'app/src/container/emulators/add-emulator'
import ConfigureEmulator from 'app/src/container/emulators/configure-emulator'
import CreateEmulator from 'app/src/container/emulators/create-emulator'
import { Provider } from 'react-redux'
import { Store } from 'redux'

interface RouteComponentProperties {
  store: Store
}

// Router component
export class Router extends React.PureComponent<RouteComponentProperties> {
  render(): React.ReactNode {
    return (
      <Provider store={this.props.store}>
        <BrowserRouter>
          <Switch>
            <Route path="/add-emulator/" component={AddEmulator} />
            <Route path="/configure-emulator/" component={ConfigureEmulator} />
            <Route path="/create-emulator/" component={CreateEmulator} />
            <Route path="/" component={Welcome} />
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}
