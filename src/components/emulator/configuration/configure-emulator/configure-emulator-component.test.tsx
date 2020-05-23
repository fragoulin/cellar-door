import React from 'react'
import { ConfigureEmulator } from './configure-emulator-component'
import { unmountComponentAtNode } from 'react-dom'
import { screen } from '@testing-library/react'
import { createComponentWithIntlAndProviderAndRouter } from '../../../../../test/createComponentsHelpers'
import { localeService } from '../../../../rendererDependencies'
import configureMockStore from 'redux-mock-store'
import Emulators from '../../../../models/emulator/emulators/index'
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
    it('should display correct message when emulator is missing', () => {
      const locale = localeService.getDefaultLocale()
      const messages = localeService.getMessagesForLocale(locale)

      createComponentWithIntlAndProviderAndRouter(
        <ConfigureEmulator
          emulator={undefined}
          hasError={false}
          setWizardStatus={jest.fn()}
          updateEmulatorConfiguration={jest.fn()}
        />,
        { locale: locale, messages: messages },
        mockStore()
      )

      expect(
        screen.getByText(messages['configure-emulator.not-found'])
      ).toBeTruthy()
    })

    it('should redirect to add emulator component when clicking on back button', () => {
      const locale = localeService.getDefaultLocale()
      const messages = localeService.getMessagesForLocale(locale)

      const mame = Emulators[0]

      createComponentWithIntlAndProviderAndRouter(
        <ConfigureEmulator
          emulator={mame}
          hasError={false}
          setWizardStatus={jest.fn()}
          updateEmulatorConfiguration={jest.fn()}
        />,
        { locale: locale, messages: messages },
        mockStore()
      )

      const backButton = screen.getByRole('button', {
        name: messages['common.back'],
      }) as HTMLAnchorElement
      expect(backButton.href).toMatch('/add-emulator/')
    })

    it('should have submit button', () => {
      const locale = localeService.getDefaultLocale()
      const messages = localeService.getMessagesForLocale(locale)

      const mame = Emulators[0]

      createComponentWithIntlAndProviderAndRouter(
        <ConfigureEmulator
          emulator={mame}
          hasError={false}
          setWizardStatus={jest.fn()}
          updateEmulatorConfiguration={jest.fn()}
        />,
        { locale: locale, messages: messages },
        mockStore()
      )

      const confirmButton = screen.getByRole('button', {
        name: messages['common.confirm'],
      }) as HTMLAnchorElement
      expect(confirmButton.type).toEqual('submit')
    })

    it('should render select directory components according to provided emulator', () => {
      const locale = localeService.getDefaultLocale()
      const messages = localeService.getMessagesForLocale(locale)

      const mame = Emulators[0]

      createComponentWithIntlAndProviderAndRouter(
        <ConfigureEmulator
          emulator={mame}
          hasError={false}
          setWizardStatus={jest.fn()}
          updateEmulatorConfiguration={jest.fn()}
        />,
        { locale: locale, messages: messages },
        mockStore()
      )

      const textboxes = screen.getAllByRole('textbox')
      expect(textboxes).toHaveLength(mame.configurations.length)
    })

    it('should call api.send() when clicking on select directory buttons', (done) => {
      const locale = localeService.getDefaultLocale()
      const messages = localeService.getMessagesForLocale(locale)

      const mame = Emulators[0]

      createComponentWithIntlAndProviderAndRouter(
        <ConfigureEmulator
          emulator={mame}
          hasError={false}
          setWizardStatus={jest.fn()}
          updateEmulatorConfiguration={jest.fn()}
        />,
        { locale: locale, messages: messages },
        mockStore()
      )

      let sendCalls = 0
      mockWindow.api.send = (
        type: string,
        _inputId: string,
        properties: { properties: ['openDirectory', 'dontAddToRecent'] }
      ): void => {
        expect(type).toEqual('dialogSync')
        expect(properties.properties[0]).toEqual('openDirectory')
        expect(properties.properties[1]).toEqual('dontAddToRecent')
        if (++sendCalls === mame.configurations.length) {
          done()
        }
      }

      mame.configurations.forEach((configuration) => {
        const button = screen.getByRole(configuration.name)
        userEvent.click(button)
      })
    })
  })
