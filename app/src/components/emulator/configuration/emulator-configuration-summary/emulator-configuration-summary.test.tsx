import React from 'react'
import EmulatorConfigurationSummary from './emulator-configuration-summary'
import { screen } from '@testing-library/react'
import { createComponentWithRouter } from '../../../../../../test/createComponentsHelpers'
import Emulators from '../../../../models/emulator/emulators/index'

it('should correctly display configuration rows', () => {
  const mame = Emulators[0]
  createComponentWithRouter(
    <EmulatorConfigurationSummary configuration={mame.configuration} />
  )

  const rows = screen.getAllByRole('row')
  expect(rows).toHaveLength(mame.configuration.length)
  mame.configuration.forEach((configuration, i) => {
    expect(rows[i].textContent).toEqual(configuration.name)
  })
})
