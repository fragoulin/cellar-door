import React from 'react'
import { Welcome } from './welcome-component'
import { unmountComponentAtNode } from 'react-dom'
import { screen } from '@testing-library/react'
import { createComponentWithIntlAndProviderAndRouter } from '../../../../test/createComponentsHelpers'
import { localeService } from '../../../rendererDependencies'
import { Cellar } from '../../../models/cellar'
import { Emulator } from '../../../models/emulator/types'
import configureMockStore from 'redux-mock-store'
import { testComponents } from '../fresh-installation/fresh-installation-component.test'
import Emulators from '../../../models/emulator/emulators/index'

let container: HTMLDivElement | undefined
const mockStore = configureMockStore()

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

it('should correctly display heading', () => {
  const locale = localeService.getDefaultLocale()
  const messages = localeService.getMessagesForLocale(locale)
  const cellar: Cellar = {}
  const emulatorsInCellar: Emulator[] = []

  createComponentWithIntlAndProviderAndRouter(
    <Welcome cellar={cellar} emulatorsInCellar={emulatorsInCellar} />,
    { locale: locale, messages: messages },
    mockStore()
  )

  expect(screen.getByRole('heading').textContent).toEqual(
    messages['welcome.title']
  )
})

it('should render fresh installation component if cellar is empty', () => {
  const locale = localeService.getDefaultLocale()
  const messages = localeService.getMessagesForLocale(locale)
  const cellar: Cellar = {}
  const emulatorsInCellar: Emulator[] = []

  createComponentWithIntlAndProviderAndRouter(
    <Welcome cellar={cellar} emulatorsInCellar={emulatorsInCellar} />,
    { locale: locale, messages: messages },
    mockStore()
  )

  testComponents(messages)
})

it('should render emulators list component if cellar contains emulators', () => {
  const locale = localeService.getDefaultLocale()
  const messages = localeService.getMessagesForLocale(locale)
  const cellar: Cellar = {}
  const emulatorsInCellar: Emulator[] = Emulators

  createComponentWithIntlAndProviderAndRouter(
    <Welcome cellar={cellar} emulatorsInCellar={emulatorsInCellar} />,
    { locale: locale, messages: messages },
    mockStore()
  )

  // TODO
})
