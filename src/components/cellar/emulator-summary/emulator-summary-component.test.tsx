import React from 'react'
import { EmulatorSummary } from './emulator-summary-component'
import { unmountComponentAtNode } from 'react-dom'
import Emulators from '../../../models/emulator/emulators/index'
import { render, screen } from '@testing-library/react'

let container: HTMLDivElement | undefined

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  // cleanup on exiting
  if (container) {
    unmountComponentAtNode(container)
    container.remove()
    container = undefined
  }
})

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
