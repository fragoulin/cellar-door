import React from 'react'
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'
import { Welcome } from '../../pages/welcome/welcome-component'

// Router component
export class Router extends React.PureComponent {
  render (): React.ReactNode {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Welcome}/>
        </Switch>
      </BrowserRouter>
    )
  }
}
