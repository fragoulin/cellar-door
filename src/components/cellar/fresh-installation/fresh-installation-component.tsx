import React from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

export interface FreshInstallationComponentDispatchProperties {
  createCellar: Function;
}

export class FreshInstallation extends React.PureComponent<FreshInstallationComponentDispatchProperties> {
  componentDidMount (): void {
    // Automatically create default cellar
    this.props.createCellar()
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
