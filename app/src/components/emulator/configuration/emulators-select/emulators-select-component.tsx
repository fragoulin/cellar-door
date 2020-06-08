import './emulators-select.scss'
import * as React from 'react'
import { Select, InputLabel, FormHelperText } from '@material-ui/core'
import { EmulatorId } from 'models/emulator/types'
import { EmulatorIdsToName } from 'redux/modules/cellar'
import { withTranslation, WithTranslation } from 'react-i18next'

/**
 * Properties definition for this component.
 */
export interface EmulatorSelectComponentProperties {
  hasError: boolean
  errorMessage?: string
  onEmulatorSelected: (emulatorId: EmulatorId) => void
}

/**
 * Properties definition for this component (from redux state).
 */
export interface EmulatorsSelectComponentStateProperties {
  availableEmulatorNames: EmulatorIdsToName[]
}

/**
 * State definition for this component.
 */
interface EmulatorSelectComponentState {
  selectedEmulatorId: EmulatorId | ''
}

/**
 * Emulators select component displays a list of selectable emulators.
 */
class EmulatorsSelect extends React.PureComponent<
  EmulatorSelectComponentProperties &
    EmulatorsSelectComponentStateProperties &
    WithTranslation,
  EmulatorSelectComponentState
> {
  /**
   * Set the initial state of this component.
   *
   * @param props - component properties.
   */
  constructor(
    props: EmulatorSelectComponentProperties &
      EmulatorsSelectComponentStateProperties &
      WithTranslation
  ) {
    super(props)

    this.state = {
      selectedEmulatorId: '',
    }
  }

  private handleChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ): void => {
    const emulatorId = event.target.value as EmulatorId
    this.setState({
      selectedEmulatorId: emulatorId,
    })
    this.props.onEmulatorSelected(emulatorId)
  }

  /**
   * Renders the list of emulators.
   *
   * @returns the newly created node.
   */
  public render(): React.ReactNode {
    return (
      <>
        <InputLabel htmlFor="emulator">
          {this.props.t('emulatorSelect.label')}
        </InputLabel>
        <Select
          native
          name="emulator"
          className="emulators-list"
          value={this.state.selectedEmulatorId}
          onChange={this.handleChange}
        >
          <option aria-label="None" value="" />
          {this.props.availableEmulatorNames.map((e) => (
            <option key={e.id} value={e.id}>
              {e.name}
            </option>
          ))}
        </Select>
        {this.props.hasError && (
          <FormHelperText>{this.props.errorMessage}</FormHelperText>
        )}
      </>
    )
  }
}

export default withTranslation()(EmulatorsSelect)
