import React from 'react'
import Welcome from './welcome-component'
import { screen } from '@testing-library/react'
import { createComponentWithProviderAndRouter } from 'test/createComponentsHelpers'
import { Cellar } from 'models/cellar'
import { Emulator } from 'models/emulator/types'
import configureMockStore from 'redux-mock-store'
import { testComponents } from 'components/cellar/fresh-installation/fresh-installation-component.test'

const mockStore = configureMockStore()

it('should correctly display heading', () => {
  const cellar: Cellar = {}
  const emulatorsInCellar: Emulator[] = []

  createComponentWithProviderAndRouter(
    <Welcome
      cellar={cellar}
      emulatorsInCellar={emulatorsInCellar}
      createCellar={jest.fn()}
    />,
    mockStore()
  )

  expect(screen.getByRole('heading').textContent).toEqual('welcome.title')
})

it('should render fresh installation component if cellar is empty', () => {
  const cellar: Cellar = {}
  const emulatorsInCellar: Emulator[] = []

  createComponentWithProviderAndRouter(
    <Welcome
      cellar={cellar}
      emulatorsInCellar={emulatorsInCellar}
      createCellar={jest.fn()}
    />,
    mockStore()
  )

  testComponents()
})
