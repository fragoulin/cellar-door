import React, { useEffect, useState } from 'react'
import { Emulator } from 'models/emulator/types'
import { withTranslation, WithTranslation } from 'react-i18next'
import useStyles from './create-emulator-styles'
import { CellarWin } from 'electron/preload'
import { SnapRetrieved, GetSnap } from 'electron/constants'
import { LinearProgress } from '@material-ui/core'
import {
  CreateDatabaseAction,
  AddSnapAction,
  DatabaseCreatedAction,
  SnapAddedAction,
} from 'emulators/mame/constants'
import _ from 'lodash'
// eslint-disable-next-line import/no-webpack-loader-syntax
import SnapsWorker from 'worker-loader!emulators/mame/workers/snaps.worker'

/**
 * Properties definition for this component.
 */
type CreateEmulatorComponentProperties = {
  emulator: Emulator | undefined
}

/**
 * Create emulator component is the result page after an emulator has been created.
 */
function CreateEmulator(
  props: CreateEmulatorComponentProperties & WithTranslation
): React.ReactElement {
  const classes = useStyles()
  const win = window as CellarWin
  const [count, setCount] = useState(0)
  const [initialized, setInitialized] = useState(false)

  const handleDatabaseCreatedAction = (event: MessageEvent): void => {
    const snapsWorker = event.currentTarget as SnapsWorker
    win.api.receive(
      SnapRetrieved,
      (
        romName: string,
        snap: string,
        entriesNumber: number,
        error?: Error | undefined
      ) => {
        snapsWorker.postMessage({
          action: AddSnapAction,
          romName: romName,
          snap: snap,
          entriesNumber: entriesNumber,
          error: error,
        })
      }
    )
    if (props.emulator) {
      win.api.send(GetSnap, props.emulator.configuration)
    }
  }

  function handleWorkerMessage(event: MessageEvent): void {
    const { action } = event.data
    switch (action) {
      case DatabaseCreatedAction:
        handleDatabaseCreatedAction(event)
        break
      case SnapAddedAction:
        setCount(event.data.done)
        break
    }
  }

  const initWorker = (): void => {
    if (initialized) return
    setInitialized(true)

    const snapsWorker = new SnapsWorker()
    snapsWorker.onmessage = _.throttle(handleWorkerMessage, 150)
    snapsWorker.postMessage({ action: CreateDatabaseAction })
  }

  useEffect(() => {
    initWorker()
  })

  //    test = `data:image/png;base64,${snap}`
  if (!props.emulator) return <div>No emulator found</div>

  return (
    <div className={classes.createEmulatorMain}>
      <div>
        <h1>
          {props.t('createEmulator.title', {
            name: props.emulator.shortName,
          })}
        </h1>
        <LinearProgress variant="determinate" value={count} />
      </div>
    </div>
  )
}

export default withTranslation()(CreateEmulator)
