import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Welcome from 'components/cellar/welcome/welcome'
import EmulatorStepper from 'components/emulator/stepper/emulator-stepper'
import ConfigureEmulator from 'components/emulator/configuration/configure-emulator/configure-emulator'
import EmulatorMain from 'components/cellar/emulator-main/emulator-main'
import Appbar from 'components/main/appbar/appbar'
import { Paper } from '@material-ui/core'
import useStyles from './router-styles'
import emulatorCreated from 'components/emulator/creation/emulator-created/emulator-created'
import CreateEmulator from 'components/emulator/creation/create-emulator/create-emulator'

/**
 * This component handles routes.
 */
export function Router(): React.ReactElement {
  const classes = useStyles()

  return (
    <BrowserRouter>
      <Appbar />
      <Paper className={classes.root}>
        <Switch>
          <Route path="/add-emulator/" component={EmulatorStepper} />
          <Route path="/configure-emulator/:id" component={ConfigureEmulator} />
          <Route path="/create-emulator/" component={CreateEmulator} />
          <Route path="/emulator-created/" component={emulatorCreated} />
          <Route path="/emulator/:id" component={EmulatorMain} />
          <Route path="/" component={Welcome} />
        </Switch>
      </Paper>
    </BrowserRouter>
  )
}
