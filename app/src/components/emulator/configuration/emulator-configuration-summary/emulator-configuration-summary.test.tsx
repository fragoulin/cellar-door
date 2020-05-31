import React from 'react'
import EmulatorConfigurationSummary from './emulator-configuration-summary'
import { screen } from '@testing-library/react'
import { createComponentWithRouter } from '../../../../../../test/createComponentsHelpers'
import Emulators from '../../../../models/emulator/emulators/index'

it('should correctly display configurations rows', () => {
  const mame = Emulators[0]
  createComponentWithRouter(
    <EmulatorConfigurationSummary configurations={mame.configurations} />
  )

  const rows = screen.getAllByRole('row')
  expect(rows).toHaveLength(mame.configurations.length)
  mame.configurations.forEach((configuration, i) => {
    expect(rows[i].textContent).toEqual(configuration.name)
  })
})
