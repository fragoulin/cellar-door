import './configure-emulator.scss'
import React from 'react'
import { Link, Redirect, RouteComponentProps } from 'react-router-dom'
import { Button, FormControl } from '@material-ui/core'
import {
  Emulator,
  EmulatorConfiguration,
  EmulatorId,
} from 'models/emulator/types'
import SelectDirectory from 'components/emulator/configuration/select-directory/select-directory-component'
import { updateConfiguration, getEmulator } from 'services/emulators-service'
import { withTranslation, WithTranslation } from 'react-i18next'

/**
 * Properties definition for this component (from redux reducer).
 */
export interface ConfigureEmulatorComponentDispatchProperties {
  addEmulatorToCellar: (emulator: Emulator) => void
}

/**
 * Additional properties definition to retrieve emulator Id from URL parameters.
 */
interface MatchParams {
  id: string
}

/**
 * State definition for this component.
 */
interface ComponentState {
  redirect: boolean
  hasError: boolean
  emulator: Emulator
}

/**
 * Configure emulator component displays a basic form to pre-configure an emulator with basic properties (mainly mandatories directories).
 */
class ConfigureEmulator extends React.PureComponent<
  ConfigureEmulatorComponentDispatchProperties &
    RouteComponentProps<MatchParams> &
    WithTranslation,
  ComponentState
> {
  /**
   * Initialize component state with default configuration form.
   *
   * @param props - component properties.
   */
  constructor(
    props: ConfigureEmulatorComponentDispatchProperties &
      RouteComponentProps<MatchParams> &
      WithTranslation
  ) {
    super(props)

    const emulator = getEmulator(this.props.match.params.id as EmulatorId)

    if (emulator) {
      this.state = {
        redirect: false,
        hasError: false,
        emulator: emulator,
      }
    }
  }

  private setConfiguration = (
    name: string,
    value: string,
    mandatory: boolean
  ): void => {
    const emulator = this.state.emulator
    emulator.configuration = updateConfiguration(emulator, {
      name,
      value,
      mandatory,
    })
    this.setState({
      emulator: emulator,
    })
  }

  private isConfigurationValueSet(name: string): boolean {
    return (
      this.state.emulator.configuration.find(
        (configuration) => configuration.name === name && configuration.value
      ) !== undefined
    )
  }

  private isConfigurationMissing(): boolean {
    if (!this.state.emulator) return false
    return (
      this.state.emulator.configuration.find(
        (configuration) =>
          configuration.mandatory &&
          !this.isConfigurationValueSet(configuration.name)
      ) !== undefined
    )
  }

  private handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault()

    const error = this.isConfigurationMissing()

    if (!error) {
      this.props.addEmulatorToCellar(this.state.emulator)
    }

    this.setState({
      redirect: !error,
      hasError: error,
    })
  }

  /**
   * Renders title, form and back/submit buttons.
   * If emulator is configured, redirect to next step (emulator creation).
   *
   * @returns the newly created node.
   */
  public render(): React.ReactNode {
    if (!this.state.emulator)
      return <div>{this.props.t('configureEmulator.notFound')}</div>
    if (this.state.redirect) return <Redirect to="/create-emulator/" />

    return (
      <form className="ConfigureEmulator" onSubmit={this.handleSubmit}>
        <h1>
          {this.props.t('configureEmulator.title', {
            name: this.state.emulator.shortName,
          })}
        </h1>
        <div>
          <FormControl required error={this.state.hasError}>
            {this.state.emulator.configuration.map(
              (configuration: EmulatorConfiguration) => {
                return (
                  <SelectDirectory
                    hasError={this.state.hasError}
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
