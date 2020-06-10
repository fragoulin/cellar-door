import './configure-emulator.scss'
import React, { useState } from 'react'
import { FormControl } from '@material-ui/core'
import { Emulator, EmulatorConfiguration } from 'models/emulator/types'
import SelectDirectory from 'components/emulator/configuration/select-directory/select-directory'
import { withTranslation, WithTranslation } from 'react-i18next'
import { updateConfiguration } from 'services/emulators-service'

type ConfigureEmulatorProperties = {
  setConfigurationMissing: (configurationMissing: boolean) => void
  emulator: Emulator
}

/**
 * Configure emulator component displays a basic form to pre-configure an emulator with basic properties (mainly mandatories directories).
 */
function ConfigureEmulator(
  props: ConfigureEmulatorProperties & WithTranslation
): React.ReactElement {
  const [hasError] = useState(false)

  const isConfigurationValueSet = (name: string): boolean => {
    return (
      props.emulator.configuration.find(
        (configuration) => configuration.name === name && configuration.value
      ) !== undefined
    )
  }

  const isConfigurationMissing = (): boolean => {
    if (!props.emulator) return false
    return (
      props.emulator.configuration.find(
        (configuration) =>
          configuration.mandatory &&
          !isConfigurationValueSet(configuration.name)
      ) !== undefined
    )
  }

  const setConfiguration = (
    name: string,
    value: string,
    mandatory: boolean
  ): void => {
    props.emulator.configuration = updateConfiguration(props.emulator, {
      name,
      value,
      mandatory,
    })

    props.setConfigurationMissing(isConfigurationMissing())
  }

  if (!props.emulator) return <div>{props.t('configureEmulator.notFound')}</div>

  return (
    <form className="configure-emulator">
      <h1>
        {props.t('configureEmulator.title', {
          name: props.emulator.shortName,
        })}
      </h1>
      <div>
        <FormControl required error={hasError}>
          {props.emulator.configuration.map(
            (configuration: EmulatorConfiguration) => {
              return (
                <SelectDirectory
                  hasError={hasError}
                  key={configuration.name}
                  name={configuration.name}
                  mandatory={configuration.mandatory}
                  onDirectorySelected={setConfiguration}
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

export default withTranslation()(ConfigureEmulator)
