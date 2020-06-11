import React, { useState, useEffect } from 'react'
import { IconButton, TextField } from '@material-ui/core'
import FolderIcon from '@material-ui/icons/Folder'
import { v4 as uuidv4 } from 'uuid'
import { CellarWin } from 'electron/preload'
import { withTranslation, WithTranslation } from 'react-i18next'
import {
  DialogSelectDirectoryChannel,
  DialogSyncResultChannel,
} from 'electron/constants'
import useStyles from './select-directory-styles'

/**
 * Properties definition for this component.
 */
type ComponentProperties = {
  name: string
  mandatory: boolean
  onDirectorySelected(
    name: string,
    directoryName: string,
    mandatory: boolean
  ): void
  hasError: boolean
  value?: string
}

/**
 * Cellar window.
 */
const win = window as CellarWin

/**
 * Select directory component displays a file selector which can select a directory.
 */
function SelectDirectory(
  props: ComponentProperties & WithTranslation
): React.ReactElement {
  const classes = useStyles()
  const [inputId] = useState(uuidv4())
  const [value, setValue] = useState(props.value)

  const openDialog = (): void => {
    // Invoke dialog sync from main thread
    const properties = { properties: ['openDirectory', 'dontAddToRecent'] }
    win.api.send(DialogSelectDirectoryChannel, inputId, properties)
  }

  /*
   * Callback for dialogSync call to main process
   */
  const dialogResult = (inputIdFromDialog: string, files: string[]): void => {
    if (inputId !== inputIdFromDialog) return
    if (!files || files.length !== 1) return

    setValue(files[0])

    props.onDirectorySelected(props.name, files[0], props.mandatory)
  }

  /**
   * Set callback for dialog select directory result
   */
  useEffect(() => {
    win.api.receive(DialogSyncResultChannel, dialogResult)
  })

  return (
    <div>
      <TextField
        required={props.mandatory}
        className={classes.directoryName}
        label={props.name}
        value={value}
        InputProps={{
          readOnly: true,
        }}
        onClick={openDialog}
      />
      <label htmlFor="select-directory">
        <IconButton
          color="primary"
          aria-label={props.t('selectDirectory.label')}
          role={props.name}
          component="span"
          onClick={openDialog}
        >
          <FolderIcon />
        </IconButton>
      </label>
    </div>
  )
}

export default withTranslation()(SelectDirectory)
