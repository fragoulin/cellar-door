import './select-directory.css'
import React from 'react'
import { IconButton, TextField, FormHelperText } from '@material-ui/core'
import FolderIcon from '@material-ui/icons/Folder'
import { FormattedMessage } from 'react-intl'
import { v4 as uuidv4 } from 'uuid'
import { CellarWin } from 'src/preload'

interface ComponentProperties {
  name: string;
  mandatory: boolean;
  onDirectorySelected: Function;
  hasError: boolean;
}

interface ComponentState {
  directoryName: string;
  inputId: string;
}

// For TS validation
interface InputDirectory extends HTMLInputElement {
  directory: boolean;
  webkitdirectory: boolean;
}

const win = window as CellarWin

// Select directory component
export class SelectDirectory extends React.PureComponent<ComponentProperties, ComponentState> {
  constructor (props: ComponentProperties) {
    super(props)

    this.state = {
      directoryName: '',
      inputId: uuidv4()
    }
  }

  componentDidMount (): void {
    // Set properties unsupported by React in order to be able to select a directory
    win.api.receive('dialogSyncResult', this.dialogResult)
  }

  private openDialog = (): void => {
    // Invoke dialog sync from main thread
    const properties = { properties: ['openDirectory', 'dontAddToRecent'] }
    win.api.send('dialogSync', this.state.inputId, properties)
  }

  // Callback for dialogSync call to main process
  private dialogResult = (inputId: string, files: string[]): void => {
    if (this.state.inputId === inputId && files?.length === 1) {
      const directoryName = files[0]

      this.setState({
        directoryName: directoryName
      })

      this.props.onDirectorySelected(this.props.name, directoryName, this.props.mandatory)
    }
  }

  public render (): React.ReactNode {
    return (
      <div>
        <TextField
          required={this.props.mandatory}
          className="DirectoryName"
          label={this.props.name}
          value={this.state.directoryName}
          InputProps={{
            readOnly: true
          }}
          onClick={this.openDialog}
        />
        <label htmlFor="select-directory">
          <IconButton color="primary" aria-label="Select directory" component="span" onClick={this.openDialog}>
            <FolderIcon/>
          </IconButton>
        </label>
        {this.props.mandatory && this.props.hasError && <FormHelperText><FormattedMessage id="select-directory.error-required"/></FormHelperText>}
      </div>
    )
  }
}
