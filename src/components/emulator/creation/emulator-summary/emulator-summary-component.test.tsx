import React from 'react'
import { EmulatorSummary } from './emulator-summary-component'
import { unmountComponentAtNode } from 'react-dom'
import Emulators from '../../../../models/emulator/emulators/index'
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

it('should correctly render component', () => {
  const mame = Emulators[0]
  render(<EmulatorSummary emulator={mame} />)

  expect(screen.getByRole('heading').textContent).toEqual(mame.shortName)
  expect(screen.getByRole('table')).toBeTruthy()
})
