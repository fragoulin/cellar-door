import './select-directory.scss'
import React from 'react'
import { IconButton, TextField } from '@material-ui/core'
import FolderIcon from '@material-ui/icons/Folder'
import { v4 as uuidv4 } from 'uuid'
import { CellarWin } from 'electron/preload'
import { withTranslation, WithTranslation } from 'react-i18next'
import {
  DialogSelectDirectoryChannel,
  DialogSyncResultChannel,
} from 'electron/constants'

/**
 * Properties definition for this component.
 */
interface ComponentProperties extends WithTranslation {
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
 * State definition for this component.
 */
interface ComponentState {
  inputId: string
  value?: string
}

/**
 * Cellar window.
 */
const win = window as CellarWin

/**
 * Select directory component displays a file selector which can select a directory.
 */
class SelectDirectory extends React.PureComponent<
  ComponentProperties,
  ComponentState
> {
  /**
   * Initialize component state.
   *
   * @param props - component properties.
   */
  constructor(props: ComponentProperties) {
    super(props)

    this.state = {
      inputId: uuidv4(),
      value: this.props.value,
    }
  }

  /**
   * Set callback for dialog select directory result
   */
  componentDidMount(): void {
    win.api.receive(DialogSyncResultChannel, this.dialogResult)
  }

  private openDialog = (): void => {
    // Invoke dialog sync from main thread
    const properties = { properties: ['openDirectory', 'dontAddToRecent'] }
    win.api.send(DialogSelectDirectoryChannel, this.state.inputId, properties)
  }

  /*
   * Callback for dialogSync call to main process
   */
  private dialogResult = (inputId: string, files: string[]): void => {
    if (this.state.inputId !== inputId) return
    if (!files || files.length !== 1) return

    this.setState({
      value: files[0],
    })

    this.props.onDirectorySelected(
      this.props.name,
      files[0],
      this.props.mandatory
    )
  }

  /**
   * Render the directory selector.
   *
   * @returns the newly created node.
   */
  public render(): React.ReactNode {
    return (
      <div>
        <TextField
          required={this.props.mandatory}
          className="directory-name"
          label={this.props.name}
          value={this.state.value}
          InputProps={{
            readOnly: true,
          }}
          onClick={this.openDialog}
        />
        <label htmlFor="select-directory">
          <IconButton
            color="primary"
            aria-label={this.props.t('selectDirectory.label')}
            role={this.props.name}
            component="span"
            onClick={this.openDialog}
          >
            <FolderIcon />
          </IconButton>
        </label>
      </div>
    )
  }
}

export default withTranslation()(SelectDirectory)
