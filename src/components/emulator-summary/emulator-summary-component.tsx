import React from 'react'
import { Emulator } from '../../models/emulator/emulator'
import { EmulatorConfigurationSummary } from '../emulator-configuration-summary/emulator-configuration-summary'
import HelpIcon from '@material-ui/icons/Help'
import { Tooltip, Zoom } from '@material-ui/core'

export interface EmulatorSummaryComponentProperties {
  emulator: Emulator;
}

export class EmulatorSummary extends React.PureComponent<EmulatorSummaryComponentProperties> {
  public render (): React.ReactNode {
    return (
      <div>
        <h2>{this.props.emulator.shortName}
          <Tooltip TransitionComponent={Zoom} title={this.props.emulator.description}>
            <HelpIcon fontSize="small"/>
          </Tooltip>
        </h2>
        <EmulatorConfigurationSummary configurations={this.props.emulator.configurations}/>
      </div>
    )
  }
}
