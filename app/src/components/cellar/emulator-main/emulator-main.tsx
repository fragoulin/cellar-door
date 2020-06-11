import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { WithTranslation, withTranslation } from 'react-i18next'
import { getEmulator } from 'services/emulators-service'
import { EmulatorId } from 'models/emulator/types'
import EmulatorLogoComponent from '../emulator-logo/emulator-logo'
import ReactDOM from 'react-dom'
import useStyles from './emulator-main-styles'

/**
 * Additional properties definition to retrieve emulator Id from URL parameters.
 */
export type MatchParams = {
  id: string
}

/**
 * The Emulator main component displays the main screen for the specified emulator.
 * This screen contains list of available games, extras resources, and buttons to configure/start emulator.
 */
function EmulatorMain(
  props: WithTranslation & RouteComponentProps<MatchParams>
): React.ReactElement {
  const classes = useStyles()
  const emulatorFromId = getEmulator(props.match.params.id as EmulatorId)
  const [emulator] = useState(emulatorFromId)

  /**
   * Render specified emulator.
   */
  const renderEmulator = (container: HTMLDivElement): void => {
    if (!emulator || !container) return

    const prefix = emulator.Id
    import(`components/emulator/emulators/${prefix}/${prefix}`)
      .then((component) => {
        const element = React.createElement(component.default)
        ReactDOM.render(element, container)
      })
      .catch(console.error)
  }

  if (!emulator) {
    return <div>Emulator not found</div>
  }

  return (
    <div className={classes.emulatorMain}>
      <h1>
        <EmulatorLogoComponent emulator={emulator} />
      </h1>
      <div ref={renderEmulator}></div>
    </div>
  )
}

export default withTranslation()(EmulatorMain)
