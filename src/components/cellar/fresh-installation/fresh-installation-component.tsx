import React from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { logger } from '../../../services/logger-service'

export interface FreshInstallationComponentDispatchProperties {
  createCellar: Function;
}

export class FreshInstallation extends React.PureComponent<FreshInstallationComponentDispatchProperties> {
  constructor (props: FreshInstallationComponentDispatchProperties) {
    super(props)

    logger.info('Fresh installation detected. Create default cellar')

    // Automatically create default cellar
    props.createCellar()
  }

  public render (): React.ReactNode {
    return (
      <div>
        <p>Fresh installation detected. You can configure your first emulator by clicking on the following button:</p>
        <Button color="primary" component={Link} to="/add-emulator/">Add emulator</Button>
      </div>
    )
  }
}
