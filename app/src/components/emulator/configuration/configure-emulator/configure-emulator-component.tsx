import './configure-emulator.scss'
import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Button, FormControl } from '@material-ui/core'
import {
  Emulator,
  EmulatorConfiguration,
} from '../../../../models/emulator/types'
import SelectDirectory from '../select-directory/select-directory-component'
import { updateConfiguration } from '../../../../services/emulators-service'
import { withTranslation, WithTranslation } from 'react-i18next'

/**
 * Properties definition for this component (from redux state).
 */
export interface ConfigureEmulatorComponentStateProperties {
  emulator: Emulator | undefined
  hasError: boolean
}

/**
 * Properties definition for this component (from redux reducer).
 */
export interface ConfigureEmulatorComponentDispatchProperties {
  setWizardStatus(status: boolean): void
  updateEmulatorConfiguration(configuration: EmulatorConfiguration[]): void
}

/**
 * State definition for this component.
 */
interface ComponentState {
  redirect: boolean
  configuration: EmulatorConfiguration[]
}

/**
 * Configure emulator component displays a basic form to pre-configure an emulator with basic properties (mainly mandatories directories).
 */
class ConfigureEmulator extends React.PureComponent<
  ConfigureEmulatorComponentStateProperties &
    ConfigureEmulatorComponentDispatchProperties &
    WithTranslation,
  ComponentState
> {
  /**
   * Initialize component state with default configuration form.
   *
   * @param props - component properties.
   */
  constructor(
    props: ConfigureEmulatorComponentStateProperties &
      ConfigureEmulatorComponentDispatchProperties &
      WithTranslation
  ) {
    super(props)

    this.state = {
      redirect: false,
      configuration: this.props.emulator
        ? this.props.emulator.configuration
        : [],
    }
  }

  private setConfiguration = (
    name: string,
    value: string,
    mandatory: boolean
  ): void => {
    this.setState((state) => ({
      configuration: updateConfiguration(state.configuration, {
        name,
        value,
        mandatory,
      }),
    }))
  }

  private isConfigurationValueSet(name: string): boolean {
    return (
      this.state.configuration.find(
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

  private handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault()

    const validConfiguration = !this.isConfigurationMissing()
    this.props.setWizardStatus(!validConfiguration)

    if (validConfiguration) {
      this.props.updateEmulatorConfiguration(this.state.configuration)
    }

    this.setState({
      redirect: validConfiguration,
    })
  }

  /**
   * Renders title, form and back/submit buttons.
   * If emulator is configured, redirect to next step (emulator creation).
   *
   * @returns the newly created node.
   */
  public render(): React.ReactNode {
    if (!this.props.emulator)
      return <div>{this.props.t('configureEmulator.notFound')}</div>
    if (this.state.redirect) return <Redirect to="/create-emulator/" />

    return (
      <form className="ConfigureEmulator" onSubmit={this.handleSubmit}>
        <h1>
          {this.props.t('configureEmulator.title', {
            name: this.props.emulator.shortName,
          })}
        </h1>
        <div>
          <FormControl required error={this.props.hasError}>
            {this.props.emulator.configuration.map(
              (configuration: EmulatorConfiguration) => {
                return (
                  <SelectDirectory
                    hasError={this.props.hasError}
                    key={configuration.name}
                    name={configuration.name}
                    mandatory={configuration.mandatory}
                    onDirectorySelected={this.setConfiguration}
                  />
                )
              }
            )}
          </FormControl>
        </div>
        <Button color="secondary" component={Link} to="/add-emulator/">
          {this.props.t('common.back')}
        </Button>
        <Button color="primary" type="submit">
          {this.props.t('common.confirm')}
        </Button>
      </form>
    )
  }
}

export default withTranslation()(ConfigureEmulator)
