import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'

/**
 * Emulators list component renders the list of emulators associated to the current cellar.
 */
export class EmulatorsList extends React.PureComponent {
  /**
   * Render title and the list of emulators.
   *
   * @returns the newly created node.
   */
  public render(): React.ReactNode {
    return (
      <>
        <h2>
          <FormattedMessage id="emulators-list.title" />
        </h2>
        <div>TODO</div>
        <Button color="primary" component={Link} to="/add-emulator/">
          <FormattedMessage id="fresh-installation.button-text" />
        </Button>
      </>
    )
  }
}
