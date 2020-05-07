import React from 'react'
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'
import Welcome from '../../container/welcome'
import AddEmulator from '../../container/add-emulator'
import ConfigureEmulator from '../../container/configure-emulator'
import CreateEmulator from '../../container/create-emulator'
import { Provider } from 'react-redux'
import store from '../../store/store'

// Router component
export class Router extends React.PureComponent {
  render (): React.ReactNode {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/add-emulator/" component={AddEmulator}/>
            <Route path="/configure-emulator/" component={ConfigureEmulator}/>
            <Route path="/create-emulator/" component={CreateEmulator}/>
            <Route path="/" component={Welcome}/>
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}
