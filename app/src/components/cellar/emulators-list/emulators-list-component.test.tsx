import React from 'react'
import EmulatorsList from './emulators-list-component'
import { screen } from '@testing-library/react'
import { Cellar } from 'app/src/models/cellar'
import { Emulator } from 'app/src/models/emulator/types'
import { createComponentWithRouter } from 'app/test/createComponentsHelpers'

it('should have correct heading', () => {
  const cellar: Cellar = {}
  const emulatorsInCellar: Emulator[] = []

  createComponentWithRouter(<EmulatorsList cellar={cellar} emulatorsInCellar={emulatorsInCellar} />)

  expect(screen.getByRole('heading').textContent).toEqual('emulatorsList.title')
})
