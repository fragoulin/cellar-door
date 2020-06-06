import React from 'react'
import EmulatorsList from './emulators-list-component'
import { screen } from '@testing-library/react'
import { createComponentWithRouter } from 'test/createComponentsHelpers'
import { Emulator } from 'models/emulator/types'

it('should have correct heading', () => {
  const emulatorsInCellar: Emulator[] = []

  createComponentWithRouter(
    <EmulatorsList
      emulatorsInCellar={emulatorsInCellar}
      emulatorsReordered={jest.fn()}
    />
  )

  expect(screen.getByRole('heading').textContent).toEqual('emulatorsList.title')
})
