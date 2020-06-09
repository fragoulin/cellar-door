import './emulator-configuration-summary.scss'
import React from 'react'
import { EmulatorConfiguration } from 'models/emulator/types'
import { withTranslation, WithTranslation } from 'react-i18next'
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core'
import Paper from '@material-ui/core/Paper'

/**
 * Properties definition for this component.
 */
interface EmulatorConfigurationSummaryProperties {
  configuration: EmulatorConfiguration[]
}

/**
 * Emulator configuration summary component displays the specified emulator configuration.
 */
class EmulatorConfigurationSummary extends React.Component<
  EmulatorConfigurationSummaryProperties & WithTranslation
> {
  /**
   * Renders the configuration specified in the properties using a table.
   *
   * @returns the newly created node.
   */
  public render(): React.ReactNode {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="emulator configuration">
          <TableBody>
            {this.props.configuration.map(
              (configuration: EmulatorConfiguration) => {
                return (
                  <TableRow key={configuration.name}>
                    <TableCell>{configuration.name}</TableCell>
                    <TableCell>{configuration.value}</TableCell>
                  </TableRow>
                )
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}

export default withTranslation()(EmulatorConfigurationSummary)
