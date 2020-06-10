import React from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { withTranslation, WithTranslation } from 'react-i18next'

/**
 * Fresh installation component renders content related to a fresh installation (no cellar or no emulators associated to cellar).
 */
function FreshInstallation(props: WithTranslation): React.ReactElement {
  return (
    <>
      <p role="note">{props.t('freshInstallation.text')}</p>
      <Button
        color="primary"
        component={Link}
        to="/add-emulator/"
        draggable={false}
      >
        {props.t('freshInstallation.buttonText')}
      </Button>
    </>
  )
}

export default withTranslation()(FreshInstallation)
