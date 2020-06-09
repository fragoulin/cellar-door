import './configure-emulator.scss'
import React from 'react'
import { FormControl } from '@material-ui/core'
import { Emulator, EmulatorConfiguration } from 'models/emulator/types'
import SelectDirectory from 'components/emulator/configuration/select-directory/select-directory-component'
import { withTranslation, WithTranslation } from 'react-i18next'
import { updateConfiguration } from 'services/emulators-service'

interface ConfigureEmulatorProperties {
  setConfigurationMissing: (configurationMissing: boolean) => void
  emulator: Emulator
}

/**
 * State definition for this component.
 */
interface ComponentState {
  hasError: boolean
}

/**
 * Configure emulator component displays a basic form to pre-configure an emulator with basic properties (mainly mandatories directories).
 */
class ConfigureEmulator extends React.PureComponent<
  ConfigureEmulatorProperties & WithTranslation,
  ComponentState
> {
  /**
   * Initialize component state with default configuration form.
   *
   * @param props - component properties.
   */
  constructor(props: ConfigureEmulatorProperties & WithTranslation) {
    super(props)

    this.state = {
      hasError: false,
    }
  }

  private setConfiguration = (
    name: string,
    value: string,
    mandatory: boolean
  ): void => {
    this.props.emulator.configuration = updateConfiguration(
      this.props.emulator,
      {
        name,
        value,
        mandatory,
      }
    )

    this.props.setConfigurationMissing(this.isConfigurationMissing())
  }

  private isConfigurationValueSet(name: string): boolean {
    return (
      this.props.emulator.configuration.find(
        (configuration) => configuration.name === name && configuration.value
      ) !== undefined
    )
  }

  private isConfigurationMissing(): boolean {
    if (!this.props.emulator) return false
    return (
      this.props.emulator.configuration.find(
        (configuration) =>
          configuration.mandatory &&
          !this.isConfigurationValueSet(configuration.name)
      ) !== undefined
    )
  }

  /**
   * Renders title, form and back/submit buttons.
   * If emulator is configured, redirect to next step (emulator creation).
   *
   * @returns the newly created node.
   */
  public render(): React.ReactNode {
    if (!this.state || !this.props.emulator)
      return <div>{this.props.t('configureEmulator.notFound')}</div>

    return (
      <form className="configure-emulator">
        <h1>
          {this.props.t('configureEmulator.title', {
            name: this.props.emulator.shortName,
          })}
        </h1>
        <div>
          <FormControl required error={this.state.hasError}>
            {this.props.emulator.configuration.map(
              (configuration: EmulatorConfiguration) => {
                return (
                  <SelectDirectory
                    hasError={this.state.hasError}
                    key={configuration.name}
                    name={configuration.name}
                    mandatory={configuration.mandatory}
                    onDirectorySelected={this.setConfiguration}
                    value={configuration.value}
                  />
                )
              }
            )}
          </FormControl>
        </div>
      </form>
    )
  }
}

export default withTranslation()(ConfigureEmulator)
