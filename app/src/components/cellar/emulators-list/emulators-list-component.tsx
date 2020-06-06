import './emulators-list.scss'
import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { withTranslation, WithTranslation } from 'react-i18next'
import { Emulator, EmulatorId } from 'models/emulator/types'
import EmulatorLogoComponent from 'components/cellar/emulator-logo/emulator-logo-component'
import Sortable from 'sortablejs'

/**
 * Properties definition for this component.
 */
export interface EmulatorsListComponentStateProperties {
  emulatorsInCellar: Emulator[]
}

/**
 * Properties definition for this component (from redux dispatch).
 */
export interface EmulatorsListComponentDispatchProperties {
  emulatorsReordered(emulatorIds: EmulatorId[]): void
}

/**
 * Emulators list component renders the list of emulators associated to the current cellar.
 */
class EmulatorsList extends React.PureComponent<
  EmulatorsListComponentStateProperties &
    WithTranslation &
    EmulatorsListComponentDispatchProperties
> {
  /**
   * Persist emulators order according to HTML rendering current emulators.
   *
   * @param emulators - HTML for emulators
   */
  private persistEmulatorsOrder(): void {
    const htmlEmulators = document.querySelectorAll('.emulators a')
    const emulatorIds: EmulatorId[] = []
    htmlEmulators.forEach((e) => {
      const emulatorId = e.getAttribute('data-emulator')
      emulatorIds.push(emulatorId as EmulatorId)
    })
    this.props.emulatorsReordered(emulatorIds)
  }

  /**
   * Enable drag & drop for specified container.
   *
   * @param componentBackingInstance - container for draggable elements.
   */
  private dndDecorator = (componentBackingInstance: HTMLDivElement): void => {
    if (componentBackingInstance) {
      Sortable.create(componentBackingInstance, {
        onEnd: () => {
          this.persistEmulatorsOrder()
        },
      })
    }
  }

  /**
   * Render title and the list of emulators.
   *
   * @returns the newly created node.
   */
  public render(): React.ReactNode {
    return (
      <>
        <h2>{this.props.t('emulatorsList.title')}</h2>
        <div className="emulators" ref={this.dndDecorator}>
          {this.props.emulatorsInCellar.map((emulator) => (
            <Button
              key={emulator.Id}
              component={Link}
              to={`/emulator/${emulator.Id}`}
              data-emulator={emulator.Id}
            >
              <EmulatorLogoComponent emulator={emulator} />
            </Button>
          ))}
        </div>
        <Button color="primary" component={Link} to="/add-emulator/">
          {this.props.t('freshInstallation.buttonText')}
        </Button>
      </>
    )
  }
}

export default withTranslation()(EmulatorsList)
