import './select-directory.css'
import React from 'react'
import { IconButton, TextField, FormHelperText } from '@material-ui/core'
import FolderIcon from '@material-ui/icons/Folder'
import { FormattedMessage } from 'react-intl'

interface ComponentProperties {
  name: string;
  mandatory: boolean;
  onDirectorySelected: Function;
  hasError: boolean;
}

interface ComponentState {
  directoryName: string;
}

// For TS validation
interface InputDirectory extends HTMLInputElement {
  directory: boolean;
  webkitdirectory: boolean;
}

// Select directory component
export class SelectDirectory extends React.PureComponent<ComponentProperties, ComponentState> {
  private _inp: InputDirectory | undefined

  constructor (props: ComponentProperties) {
    super(props)

    this.state = {
      directoryName: ''
    }
  }

  componentDidMount (): void {
    // Set properties unsupported by React in order to be able to select a directory
    if (this._inp) {
      this._inp.directory = true
      this._inp.webkitdirectory = true
    }
  }

  private openDialog = (): void => {
    const { dialog } = require('electron').remote
    const files = dialog.showOpenDialogSync({ properties: ['openDirectory', 'dontAddToRecent'] })
    if (files?.length === 1) {
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
