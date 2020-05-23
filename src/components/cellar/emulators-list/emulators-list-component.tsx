import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { withTranslation, WithTranslation } from 'react-i18next'

/**
 * Emulators list component renders the list of emulators associated to the current cellar.
 */
class EmulatorsList extends React.PureComponent<WithTranslation> {
  /**
   * Render title and the list of emulators.
   *
   * @returns the newly created node.
   */
  public render(): React.ReactNode {
    return (
      <>
        <h2>{this.props.t('emulatorsList.title')}</h2>
        <div>TODO</div>
        <Button color="primary" component={Link} to="/add-emulator/">
          {this.props.t('freshInstallation.buttonText')}
        </Button>
      </>
    )
  }
}

export default withTranslation()(EmulatorsList)
