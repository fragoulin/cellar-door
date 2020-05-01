import React from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import { Button } from '@material-ui/core'

type EmulatorProps = RouteComponentProps<{ emulator?: string }>

// Configure emulator component
export class ConfigureEmulator extends React.PureComponent<{} & EmulatorProps> {
  public render (): React.ReactNode {
    return (
      <div>
        Configure {this.props.match.params.emulator} emulator
        <Button color="secondary" component={Link} to="/add-emulator/">Back</Button>
        <Button color="primary" component={Link} to="/create-emulator/">Confirm</Button>
      </div>
    )
  }
}
