import './select-directory.scss'
import React from 'react'
import { IconButton, TextField, FormHelperText } from '@material-ui/core'
import FolderIcon from '@material-ui/icons/Folder'
import { v4 as uuidv4 } from 'uuid'
import { CellarWin } from 'app/electron/preload'
import { withTranslation, WithTranslation } from 'react-i18next'

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
}

/**
 * State definition for this component.
 */
interface ComponentState {
  directoryName: string
  inputId: string
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
      directoryName: '',
      inputId: uuidv4(),
    }
  }

  /**
   * Set callback for dialog select directory result
   */
  componentDidMount(): void {
    win.api.receive('dialogSyncResult', this.dialogResult)
  }

  private openDialog = (): void => {
    // Invoke dialog sync from main thread
    const properties = { properties: ['openDirectory', 'dontAddToRecent'] }
    win.api.send('dialogSync', this.state.inputId, properties)
  }

  /*
   * Callback for dialogSync call to main process
   */
  private dialogResult = (inputId: string, files: string[]): void => {
    if (this.state.inputId !== inputId) return
    if (!files || files.length !== 1) return

    const directoryName = files[0]

    this.setState({
      directoryName: directoryName,
    })

    this.props.onDirectorySelected(
      this.props.name,
      directoryName,
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
          className="DirectoryName"
          label={this.props.name}
          value={this.state.directoryName}
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
        {this.props.mandatory && this.props.hasError && (
          <FormHelperText error={true} role="alert">
            {this.props.t('selectDirectory.errorRequired')}
          </FormHelperText>
        )}
      </div>
    )
  }
}

export default withTranslation()(SelectDirectory)
