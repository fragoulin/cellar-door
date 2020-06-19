import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { WithTranslation, withTranslation } from 'react-i18next'
import { Emulator } from 'models/emulator/types'
import EmulatorLogoComponent from '../emulator-logo/emulator-logo'
import ReactDOM from 'react-dom'
import useStyles from './emulator-main-styles'
import { useStore } from 'react-redux'
import { RootState } from 'redux/store'

/**
 * Additional properties definition to retrieve emulator Id from URL parameters.
 */
export type MatchParams = {
  id: string
}

/**
 * Component properties from redux state.
 */
export type EmulatorMainComponentStateProperties = {
  emulatorsInCellar: Emulator[]
}

/**
 * Component properties definition for emulators components.
 */
export type EmulatorComponentProperties = {
  emulator: Emulator
}

/**
 * The Emulator main component displays the main screen for the specified emulator.
 * This screen contains list of available games, extras resources, and buttons to configure/start emulator.
 */
function EmulatorMain(
  props: WithTranslation &
    RouteComponentProps<MatchParams> &
    EmulatorMainComponentStateProperties
): React.ReactElement {
  const classes = useStyles()
  const store = useStore()
  const state = store.getState() as RootState

  const emulator = state.cellar.present.emulatorsInCellar.find(
    (emulator) => emulator.Id === props.match.params.id
  )

  if (!emulator) {
    return <div>Emulator not found</div>
  }

  /**
   * Render specified emulator.
   */
  const renderEmulator = (container: HTMLDivElement): void => {
    if (!container) return

    const prefix = emulator.Id
    // Need to use relative path because dynamic import doesn't seem to resolve paths from tsconfig
    import(`../../../emulators/${prefix}/component`)
      .then((component) => {
        const props: EmulatorComponentProperties = {
          emulator: emulator,
        }
        const element = React.createElement(component.default, props)
        ReactDOM.render(element, container)
      })
      .catch(console.error)
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
