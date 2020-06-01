import React from 'react'
import EmulatorsList from './emulators-list-component'
import { screen } from '@testing-library/react'
import { createComponentWithRouter } from '../../../../../test/createComponentsHelpers'
import { Emulator } from 'app/src/models/emulator/types'

it('should have correct heading', () => {
  const emulatorsInCellar: Emulator[] = []

  createComponentWithRouter(
    <EmulatorsList emulatorsInCellar={emulatorsInCellar} />
  )

  expect(screen.getByRole('heading').textContent).toEqual('emulatorsList.title')
})
