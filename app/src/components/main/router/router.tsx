import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Welcome from 'container/cellar/welcome'
import EmulatorStepper from 'components/emulator/stepper/emulator-stepper'
import ConfigureEmulator from 'container/emulators/configure-emulator'
import CreateEmulator from 'container/emulators/create-emulator'
import EmulatorMain from 'container/cellar/emulator-main'
import Appbar from 'container/main/appbar'
import { Paper } from '@material-ui/core'
import useStyles from './router-styles'

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
          <Route path="/emulator/:id" component={EmulatorMain} />
          <Route path="/" component={Welcome} />
        </Switch>
      </Paper>
    </BrowserRouter>
  )
}
