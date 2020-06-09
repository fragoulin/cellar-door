import './create-emulator.scss'
import React from 'react'
import { Emulator } from 'models/emulator/types'
import EmulatorSummary from 'components/emulator/creation/emulator-summary/emulator-summary-component'
import { withTranslation, WithTranslation } from 'react-i18next'

/**
 * Properties definition for this component.
 */
interface CreateEmulatorComponentProperties {
  emulator: Emulator | undefined
}

/**
 * Properties definition from redux.
 */
export interface CreateEmulatorComponentDispatchProperties {
  addEmulatorToCellar: (emulator: Emulator) => void
}

/**
 * Create emulator component is the result page after an emulator has been created.
 */
class CreateEmulator extends React.PureComponent<
  CreateEmulatorComponentProperties &
    CreateEmulatorComponentDispatchProperties &
    WithTranslation
> {
  /**
   * Add emulator to cellar.
   */
  componentDidMount(): void {
    if (this.props.emulator) {
      this.props.addEmulatorToCellar(this.props.emulator)
    }
  }

  /**
   * Render emulator summary and control buttons to go back to cellar or create another emulator.
   *
   * @returns the newly created node.
   */
  public render(): React.ReactNode {
    if (!this.props.emulator) return null

    return (
      <div className="create-emulator">
        <div>
          <h1>
            {this.props.t('createEmulator.title', {
              name: this.props.emulator.shortName,
            })}
          </h1>
          <EmulatorSummary emulator={this.props.emulator} />
        </div>
      </div>
    )
  }
}

export default withTranslation()(CreateEmulator)
