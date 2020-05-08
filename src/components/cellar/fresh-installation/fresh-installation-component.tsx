import React from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { logger } from '../../../services/logger-service'
import { FormattedMessage } from 'react-intl'

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
        <p><FormattedMessage id="fresh-installation.text"/></p>
        <Button color="primary" component={Link} to="/add-emulator/"><FormattedMessage id="fresh-installation.button-text"/></Button>
      </div>
    )
  }
}
