import React from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { withTranslation, WithTranslation } from 'react-i18next'

/**
 * Properties definition for this component.
 */
export interface FreshInstallationComponentDispatchProperties {
  createCellar(): void
}

/**
 * Fresh installation component renders content related to a fresh installation (no cellar or no emulators associated to cellar).
 */
class FreshInstallation extends React.PureComponent<
  FreshInstallationComponentDispatchProperties & WithTranslation
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
        <p role="note">{this.props.t('freshInstallation.text')}</p>
        <Button color="primary" component={Link} to="/add-emulator/">
          {this.props.t('freshInstallation.buttonText')}
        </Button>
      </>
    )
  }
}

export default withTranslation()(FreshInstallation)
