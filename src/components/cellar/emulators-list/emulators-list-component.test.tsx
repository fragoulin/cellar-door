import React from 'react'
import { EmulatorsList } from './emulators-list-component'
import { unmountComponentAtNode } from 'react-dom'
import { screen } from '@testing-library/react'
import { createComponentWithIntlAndRouter } from '../../../../test/createComponentsHelpers'
import { localeService } from '../../../rendererDependencies'

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

it('should have correct heading', () => {
  const locale = localeService.getDefaultLocale()
  const messages = localeService.getMessagesForLocale(locale)
  createComponentWithIntlAndRouter(<EmulatorsList />, {
    locale: locale,
    messages: messages,
  })

  expect(screen.getByRole('heading').textContent).toEqual(
    messages['emulators-list.title']
  )
})
