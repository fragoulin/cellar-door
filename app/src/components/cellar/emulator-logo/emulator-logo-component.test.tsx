import React from 'react'
import EmulatorLogo from './emulator-logo-component'
import { screen } from '@testing-library/react'
import { createComponentWithRouter } from 'test/createComponentsHelpers'
import Emulators from 'models/emulator/emulators/index'

it('should correctly display logo for emulators having one', () => {
  const emulator = Emulators[0]

  createComponentWithRouter(<EmulatorLogo emulator={emulator} />)

  expect(screen.getByRole('link').className).toEqual('logo')
  // TODO check logo
})

it('should correctly display shortname for emulators having no logo', () => {
  const emulator = Emulators[2]

  createComponentWithRouter(<EmulatorLogo emulator={emulator} />)

  expect(screen.getByRole('link').className).toEqual('text')
  expect(screen.getByRole('link').textContent).toEqual(emulator.shortName)
})
