import './configure-emulator.css'
import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Button, FormControl } from '@material-ui/core'
import { Emulator } from '../../../../models/emulator/emulator'
import { SelectDirectory } from '../select-directory/select-directory-component'
import { EmulatorConfiguration } from '../../../../models/emulator/emulator-configuration'
import { List } from 'immutable'
import { FormattedMessage } from 'react-intl'

// Interface for component state properties
export interface ConfigureEmulatorComponentStateProperties {
  emulator: Emulator | undefined;
  hasError: boolean;
}

// Interface for component dispatch properties
export interface ConfigureEmulatorComponentDispatchProperties {
  setWizardStatus: Function;
  updateEmulatorConfiguration: Function;
  addEmulatorToCellar: Function;
}

// Interface for component state
interface ComponentState {
  redirect: boolean;
  configurations: EmulatorConfiguration[];
}

// Configure emulator component
export class ConfigureEmulator extends React.PureComponent<ConfigureEmulatorComponentStateProperties & ConfigureEmulatorComponentDispatchProperties, ComponentState> {
  constructor (props: ConfigureEmulatorComponentStateProperties & ConfigureEmulatorComponentDispatchProperties) {
    super(props)

    this.state = {
      redirect: false,
      configurations: []
    }
  }

  private setConfiguration = (name: string, value: string, mandatory: boolean): void => {
    // Remove existing configuration
    for (let i = 0; i < this.state.configurations.length; i++) {
      if (name === this.state.configurations[i].name) {
        this.state.configurations.splice(i, 1)
        break
      }
    }

    // Add new configuration
    this.state.configurations.push(new EmulatorConfiguration(name, mandatory, value))
  }

  private isConfigurationValueSet (name: string): boolean {
    let valueSet = false

    this.state.configurations.map(configuration => {
      if (name === configuration.name && configuration.value) {
        valueSet = true
      }
    })

    return valueSet
  }

  private isConfigurationMissing (): boolean {
    let missing = false

    if (this.props.emulator) {
      this.props.emulator.configurations.map(configuration => {
        if (configuration.mandatory && !this.isConfigurationValueSet(configuration.name)) {
          missing = true
        }
      })
    }

    return missing
  }

  private handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault()

    const validConfiguration = !this.isConfigurationMissing()
    this.props.setWizardStatus(!validConfiguration)

    if (this.props.emulator && validConfiguration) {
      this.props.updateEmulatorConfiguration(this.props.emulator.Id, List(this.state.configurations))
    }

    this.setState({
      redirect: validConfiguration
    })
  }

  public render (): React.ReactNode {
    return (
      !this.state.redirect
        ? this.props.emulator ? (
          <form className="ConfigureEmulator" onSubmit={this.handleSubmit}>
            <h1><FormattedMessage id="configure-emulator.title" values={{ name: this.props.emulator.shortName }}/></h1>
            <div>
              <FormControl required error={this.props.hasError}>
                {this.props.emulator.configurations.map(configuration => {
                  return <SelectDirectory hasError={this.props.hasError} key={configuration.name} name={configuration.name} mandatory={configuration.mandatory} onDirectorySelected={this.setConfiguration}/>
                })}
              </FormControl>
            </div>
            <Button color="secondary" component={Link} to="/add-emulator/"><FormattedMessage id="common.back"/></Button>
            <Button color="primary" type="submit"><FormattedMessage id="common.confirm"/></Button>
          </form>
        )
          : <div><FormattedMessage id="configure-emulator.not-found"/></div>
        : <Redirect to="/create-emulator/"/>
    )
  }
}
