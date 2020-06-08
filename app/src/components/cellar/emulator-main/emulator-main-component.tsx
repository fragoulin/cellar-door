import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { WithTranslation, withTranslation } from 'react-i18next'
import { getEmulator } from 'services/emulators-service'
import { EmulatorId, Emulator } from 'models/emulator/types'
import EmulatorLogoComponent from '../emulator-logo/emulator-logo-component'
import ReactDOM from 'react-dom'

/**
 * Additional properties definition to retrieve emulator Id from URL parameters.
 */
export interface MatchParams {
  id: string
}

/**
 * State definition for this component.
 */
interface ComponentState {
  emulator: Emulator
}

/**
 * The Emulator component displays the main screen for the specified emulator.
 * This screen contains list of available games, extras resources, and buttons to configure/start emulator.
 */
class EmulatorMain extends React.PureComponent<
  WithTranslation & RouteComponentProps<MatchParams>,
  ComponentState
> {
  /**
   * Initialize component state with default configuration form.
   *
   * @param props - component properties.
   */
  constructor(props: RouteComponentProps<MatchParams> & WithTranslation) {
    super(props)

    const emulator = getEmulator(this.props.match.params.id as EmulatorId)

    if (emulator) {
      this.state = {
        emulator: emulator,
      }
    }
  }

  /**
   * Render specified emulator.
   */
  private renderEmulator = (container: HTMLDivElement): void => {
    if (!container) return

    const prefix = this.state.emulator.Id
    import(`components/emulator/emulators/${prefix}/${prefix}-component`)
      .then((component) => {
        const element = React.createElement(component.default)
        ReactDOM.render(element, container)
      })
      .catch(console.error)
  }

  /**
   * Render emulator main screen.
   *
   * @returns the newly created node.
   */
  public render(): React.ReactNode {
    return (
      <div className="emulator-main">
        <h1>
          <EmulatorLogoComponent emulator={this.state.emulator} />
        </h1>
        <div ref={this.renderEmulator}></div>
      </div>
    )
  }
}

export default withTranslation()(EmulatorMain)
