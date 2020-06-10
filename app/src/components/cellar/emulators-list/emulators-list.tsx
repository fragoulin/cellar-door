import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { withTranslation, WithTranslation } from 'react-i18next'
import { Emulator, EmulatorId } from 'models/emulator/types'
import EmulatorLogoComponent from 'components/cellar/emulator-logo/emulator-logo'
import Sortable from 'sortablejs'

/**
 * Properties definition for this component.
 */
export type EmulatorsListComponentStateProperties = {
  emulatorsInCellar: Emulator[]
}

/**
 * Properties definition for this component (from redux dispatch).
 */
export type EmulatorsListComponentDispatchProperties = {
  emulatorsReordered(emulatorIds: EmulatorId[]): void
}

/**
 * Emulators list component renders the list of emulators associated to the current cellar.
 */
function EmulatorsList(
  props: EmulatorsListComponentStateProperties &
    WithTranslation &
    EmulatorsListComponentDispatchProperties
): React.ReactElement {
  /**
   * Persist emulators order according to HTML rendering current emulators.
   *
   * @param emulators - HTML for emulators
   */
  const persistEmulatorsOrder = (): void => {
    const htmlEmulators = document.querySelectorAll('.emulators a')
    const emulatorIds: EmulatorId[] = []
    htmlEmulators.forEach((e) => {
      const emulatorId = e.getAttribute('data-emulator')
      emulatorIds.push(emulatorId as EmulatorId)
    })
    props.emulatorsReordered(emulatorIds)
  }

  /**
   * Enable drag & drop for specified container.
   *
   * @param componentBackingInstance - container for draggable elements.
   */
  const dndDecorator = (componentBackingInstance: HTMLDivElement): void => {
    if (!componentBackingInstance) return
    Sortable.create(componentBackingInstance, {
      onEnd: () => {
        persistEmulatorsOrder()
      },
    })
  }

  return (
    <>
      <h2>{props.t('emulatorsList.title')}</h2>
      <div className="emulators" ref={dndDecorator}>
        {props.emulatorsInCellar.map((emulator) => (
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

export default withTranslation()(EmulatorsList)
