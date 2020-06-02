import React from 'react'
import EmulatorSummary from './emulator-summary-component'
import Emulators from 'models/emulator/emulators/index'
import { render, screen } from '@testing-library/react'

it('should render Mame emulator correctly', () => {
  const emulator = Emulators[0]
  render(<EmulatorSummary emulator={emulator} />)

  expect(screen.getByRole('heading').textContent).toEqual(emulator.shortName)
})

it('should render ScummVm emulator correctly', () => {
  const emulator = Emulators[1]
  render(<EmulatorSummary emulator={emulator} />)

  expect(screen.getByRole('heading').textContent).toEqual(emulator.shortName)
})

it('should render ZiNc emulator correctly', () => {
  const emulator = Emulators[2]
  render(<EmulatorSummary emulator={emulator} />)

  expect(screen.getByRole('heading').textContent).toEqual(emulator.shortName)
})
