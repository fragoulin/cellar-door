import React from 'react'
import EmulatorSummary from './emulator-summary-component'
import Emulators from 'models/emulator/emulators/index'
import { render, screen } from '@testing-library/react'

it('should correctly render component', () => {
  const mame = Emulators[0]
  render(<EmulatorSummary emulator={mame} />)

  expect(screen.getByRole('table')).toBeTruthy()
})
