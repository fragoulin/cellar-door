import React from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

export class FreshInstallation extends React.PureComponent {
  public render (): React.ReactNode {
    return (
      <div>
        <p>Fresh installation detected. You can configure your first emulator by clicking on the following button:</p>
        <Button color="primary" component={Link} to="/add-emulator/">Add emulator</Button>
      </div>
    )
  }
}
