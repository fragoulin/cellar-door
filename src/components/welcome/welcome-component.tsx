import * as React from 'react'
import { Button } from '@material-ui/core'
import './Welcome.css'
import { Link } from 'react-router-dom'

// Welcome page
export class Welcome extends React.PureComponent {
  render (): React.ReactNode {
    return (
      <div className="Welcome">
        <h1>Welcome to Cellar door!</h1>
        <p>Fresh installation detected. You can configure your first emulator by clicking on the following button:</p>
        <Button color="primary" component={Link} to="/add-emulator/">Add emulator</Button>
      </div>
    )
  }
}
