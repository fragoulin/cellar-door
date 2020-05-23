import './emulator-configuration-summary.css'
import React from 'react'
import { EmulatorConfiguration } from '../../../../models/emulator/types'

/**
 * Properties definition for this component.
 */
interface EmulatorConfigurationSummaryProperties {
  configurations: EmulatorConfiguration[]
}

/**
 * Emulator configuration summary component displays the specified emulator configurations.
 */
export class EmulatorConfigurationSummary extends React.Component<
  EmulatorConfigurationSummaryProperties
> {
  /**
   * Renders the configurations specified in the properties using a table.
   *
   * @returns the newly created node.
   */
  public render(): React.ReactNode {
    return (
      <table>
        <tbody>
          {this.props.configurations.map(
            (configuration: EmulatorConfiguration) => {
              return (
                <tr key={configuration.name}>
                  <td>{configuration.name}</td>
                  <td>{configuration.value}</td>
                </tr>
              )
            }
          )}
        </tbody>
      </table>
    )
  }
}
