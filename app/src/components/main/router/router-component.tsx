import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Welcome from 'container/cellar/welcome'
import AddEmulator from 'container/emulators/add-emulator'
import ConfigureEmulator from 'container/emulators/configure-emulator'
import CreateEmulator from 'container/emulators/create-emulator'
import EmulatorMain from 'components/cellar/emulator-main/emulator-main-component'
import Breadcrumb from '../breadcrumb/breadcrumb-component'

/**
 * Ignored paths in breadcrumb.
 */
const breadcrumbIgnoredPaths: string[] = ['emulator']

/**
 * Non-clickable paths in breadcrumb.
 */
const breadcrumbNonClickablePaths: string[] = ['configure-emulator']

/**
 * This component handles routes.
 */
export class Router extends React.PureComponent {
  render(): React.ReactNode {
    return (
      <BrowserRouter>
        <header>
          <Breadcrumb
            ignoredPaths={breadcrumbIgnoredPaths}
            nonClickablePaths={breadcrumbNonClickablePaths}
          />
        </header>
        <Switch>
          <Route path="/add-emulator/" component={AddEmulator} />
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
