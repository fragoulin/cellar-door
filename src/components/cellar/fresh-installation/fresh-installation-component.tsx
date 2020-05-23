import React from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

/**
 * Properties definition for this component.
 */
export interface FreshInstallationComponentDispatchProperties {
  createCellar(): void
}

/**
 * Fresh installation component renders content related to a fresh installation (no cellar or no emulators associated to cellar).
 */
export class FreshInstallation extends React.PureComponent<
  FreshInstallationComponentDispatchProperties
> {
  /**
   * Automatically create default cellar when component is mounted.
   */
  componentDidMount(): void {
    this.props.createCellar()
  }

  /**
   * Render introduction text and button to create the first emulator for the newly created cellar.
   *
   * @returns the newly created node.
   */
  public render(): React.ReactNode {
    return (
      <>
        <p role="note">
          <FormattedMessage id="fresh-installation.text" />
        </p>
        <Button color="primary" component={Link} to="/add-emulator/">
          <FormattedMessage id="fresh-installation.button-text" />
        </Button>
      </>
    )
  }
}
