import React from 'react'
import { FreshInstallation } from './fresh-installation-component'
import { unmountComponentAtNode } from 'react-dom'
import { screen } from '@testing-library/react'
import { createComponentWithIntlAndRouter } from '../../../../test/createComponentsHelpers'
import { localeService } from '../../../rendererDependencies'
import { Messages } from '../../../services/locale-service'

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

it('should create cellar after component mount', (done) => {
  const locale = localeService.getDefaultLocale()
  const messages = localeService.getMessagesForLocale(locale)

  const callback = (): void => {
    done()
  }

  createComponentWithIntlAndRouter(
    <FreshInstallation createCellar={callback} />,
    {
      locale: locale,
      messages: messages,
    }
  )
})

export const testComponents = (messages: Messages): void => {
  expect(screen.getByRole('note').textContent).toEqual(
    messages['fresh-installation.text']
  )
  const button = screen.getByRole('button') as HTMLAnchorElement
  expect(button.textContent).toEqual(messages['fresh-installation.button-text'])
  expect(button.href).toMatch('/add-emulator/')
}

it('should correctly render note and button', () => {
  const locale = localeService.getDefaultLocale()
  const messages = localeService.getMessagesForLocale(locale)
  const callback = jest.fn()

  createComponentWithIntlAndRouter(
    <FreshInstallation createCellar={callback} />,
    {
      locale: locale,
      messages: messages,
    }
  )

  testComponents(messages)
})
