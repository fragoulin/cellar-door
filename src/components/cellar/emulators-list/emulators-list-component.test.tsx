import React from 'react'
import EmulatorsList from './emulators-list-component'
import { screen } from '@testing-library/react'
import { createComponentWithRouter } from '../../../../test/createComponentsHelpers'

it('should have correct heading', () => {
  createComponentWithRouter(<EmulatorsList />)

  expect(screen.getByRole('heading').textContent).toEqual('emulatorsList.title')
})
