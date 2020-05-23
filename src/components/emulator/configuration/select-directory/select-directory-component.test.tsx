import React from 'react'
import SelectDirectory from './select-directory-component'
import { unmountComponentAtNode } from 'react-dom'
import { screen } from '@testing-library/react'
import { createComponentWithIntlAndProviderAndRouter } from '../../../../../test/createComponentsHelpers'
import { localeService } from '../../../../rendererDependencies'
import configureMockStore from 'redux-mock-store'
import { CellarWin } from '../../../../preload'
import userEvent from '@testing-library/user-event'
import wrap from 'jest-wrap'

let container: HTMLDivElement | undefined
const mockStore = configureMockStore()
const mockWindow = window as CellarWin
mockWindow.api = {
  receive: jest.fn(),
  send: jest.fn(),
}

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

wrap()
  .withGlobal('window', () => mockWindow)
  .describe('mocked window', () => {
    it('should correctly render input and button', () => {
      const name = 'test'
      const locale = localeService.getDefaultLocale()
      const messages = localeService.getMessagesForLocale(locale)

      createComponentWithIntlAndProviderAndRouter(
        <SelectDirectory
          name={name}
          hasError={false}
          mandatory={true}
          onDirectorySelected={jest.fn()}
        />,
        { locale: locale, messages: messages },
        mockStore()
      )

      const input = screen.getByRole('textbox')
      expect(input.getAttribute('required')).toEqual('')
      expect(input.getAttribute('readonly')).toEqual('')
      expect((input as HTMLInputElement).value).toEqual('')

      const directorySelector = screen.getByRole(name)
      expect(directorySelector.getAttribute('aria-label')).toEqual(
        messages['select-directory']
      )
    })

    it('should open dialog on click', (done) => {
      const name = 'test'
      const locale = localeService.getDefaultLocale()
      const messages = localeService.getMessagesForLocale(locale)

      createComponentWithIntlAndProviderAndRouter(
        <SelectDirectory
          name={name}
          hasError={false}
          mandatory={true}
          onDirectorySelected={jest.fn()}
        />,
        { locale: locale, messages: messages },
        mockStore()
      )

      mockWindow.api.send = (
        type: string,
        _inputId: string,
        properties: { properties: ['openDirectory', 'dontAddToRecent'] }
      ): void => {
        expect(type).toEqual('dialogSync')
        expect(properties.properties[0]).toEqual('openDirectory')
        expect(properties.properties[1]).toEqual('dontAddToRecent')
        done()
      }

      const directorySelector = screen.getByRole(name)
      userEvent.click(directorySelector)
    })

    it('should display error message in case of error', () => {
      const name = 'test'
      const locale = localeService.getDefaultLocale()
      const messages = localeService.getMessagesForLocale(locale)

      createComponentWithIntlAndProviderAndRouter(
        <SelectDirectory
          name={name}
          hasError={true}
          mandatory={true}
          onDirectorySelected={jest.fn()}
        />,
        { locale: locale, messages: messages },
        mockStore()
      )

      expect(screen.getByRole('alert')).toBeTruthy()
    })
  })
