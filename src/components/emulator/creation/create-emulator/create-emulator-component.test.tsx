import React from 'react'
import { CreateEmulator } from './create-emulator-component'
import { unmountComponentAtNode } from 'react-dom'
import { screen } from '@testing-library/react'
import { createComponentWithIntlAndProviderAndRouter } from '../../../../../test/createComponentsHelpers'
import { localeService } from '../../../../rendererDependencies'
import configureMockStore from 'redux-mock-store'
import { CellarWin } from '../../../../preload'
import wrap from 'jest-wrap'
import Emulators from '../../../../models/emulator/emulators/index'
import { Emulator } from '../../../../models/emulator/types'

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
    it('should correctly render components', () => {
      const locale = localeService.getDefaultLocale()
      const messages = localeService.getMessagesForLocale(locale)
      const mame = Emulators[0]

      createComponentWithIntlAndProviderAndRouter(
        <CreateEmulator emulator={mame} addEmulatorToCellar={jest.fn()} />,
        { locale: locale, messages: messages },
        mockStore()
      )

      expect(screen.getAllByRole('heading')[0].textContent).toEqual(
        messages['create-emulator.title']
      )

      expect(screen.getAllByRole('heading')[1].textContent).toEqual(
        mame.shortName
      )
      expect(screen.getByRole('table')).toBeTruthy()
      expect(
        screen
          .getByRole('button', { name: messages['common.back-to-cellar'] })
          .getAttribute('href')
      ).toEqual('/')
      expect(
        screen
          .getByRole('button', {
            name: messages['create-emulator.add-another'],
          })
          .getAttribute('href')
      ).toMatch('/add-emulator/')
    })

    it('should call addEmulatorToCellar() method', (done) => {
      const locale = localeService.getDefaultLocale()
      const messages = localeService.getMessagesForLocale(locale)
      const mame = Emulators[0]
      const callback = (emulator: Emulator): void => {
        expect(emulator.Id).toEqual(mame.Id)
        done()
      }

      createComponentWithIntlAndProviderAndRouter(
        <CreateEmulator emulator={mame} addEmulatorToCellar={callback} />,
        { locale: locale, messages: messages },
        mockStore()
      )
    })

    it('should correctly handle undefined emulator', (done) => {
      const locale = localeService.getDefaultLocale()
      const messages = localeService.getMessagesForLocale(locale)
      const callback = (): void => {
        done.fail('Should not be called')
      }

      createComponentWithIntlAndProviderAndRouter(
        <CreateEmulator emulator={undefined} addEmulatorToCellar={callback} />,
        { locale: locale, messages: messages },
        mockStore()
      )

      done()
    })
  })
