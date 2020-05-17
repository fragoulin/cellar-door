import './emulator-configuration-summary.css'
import React from 'react'
import { EmulatorConfiguration } from '../../../../models/emulator/emulator'

interface EmulatorConfigurationSummaryProperties {
  configurations: EmulatorConfiguration[];
}

export class EmulatorConfigurationSummary extends React.Component<EmulatorConfigurationSummaryProperties> {
  public render (): React.ReactNode {
    return (
      <table>
        <tbody>
          {this.props.configurations.map((configuration: EmulatorConfiguration) => {
            return <tr key={configuration.name}><td>{configuration.name}</td><td>{configuration.value}</td></tr>
          })}
        </tbody>
      </table>
    )
  }
}
