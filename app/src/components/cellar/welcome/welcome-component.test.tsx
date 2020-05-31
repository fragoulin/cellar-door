import React from 'react'
import Welcome from './welcome-component'
import { screen } from '@testing-library/react'
import { createComponentWithProviderAndRouter } from 'app/test/createComponentsHelpers'
import { Cellar } from 'app/src/models/cellar'
import { Emulator } from 'app/src/models/emulator/types'
import configureMockStore from 'redux-mock-store'
import { testComponents } from 'app/src/components/cellar/fresh-installation/fresh-installation-component.test'
import Emulators from 'app/src/models/emulator/emulators/index'

const mockStore = configureMockStore()

it('should correctly display heading', () => {
  const cellar: Cellar = {}
  const emulatorsInCellar: Emulator[] = []

  createComponentWithProviderAndRouter(
    <Welcome cellar={cellar} emulatorsInCellar={emulatorsInCellar} />,
    mockStore()
  )

  expect(screen.getByRole('heading').textContent).toEqual('welcome.title')
})

it('should render fresh installation component if cellar is empty', () => {
  const cellar: Cellar = {}
  const emulatorsInCellar: Emulator[] = []

  createComponentWithProviderAndRouter(
    <Welcome cellar={cellar} emulatorsInCellar={emulatorsInCellar} />,
    mockStore()
  )

  testComponents()
})

xit('should render emulators list component if cellar contains emulators', () => {
  const cellar: Cellar = {}
  const emulatorsInCellar: Emulator[] = Emulators

  createComponentWithProviderAndRouter(
    <Welcome cellar={cellar} emulatorsInCellar={emulatorsInCellar} />,
    mockStore()
  )

  // TODO
})
