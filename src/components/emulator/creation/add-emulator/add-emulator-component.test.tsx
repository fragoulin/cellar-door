import React from 'react'
import { AddEmulator } from './add-emulator-component'
import { unmountComponentAtNode } from 'react-dom'
import { screen } from '@testing-library/react'
import { createComponentWithIntlAndProviderAndRouter } from '../../../../../test/createComponentsHelpers'
import {
  localeService,
  emulatorsService,
} from '../../../../rendererDependencies'
import configureMockStore from 'redux-mock-store'
import { CellarWin } from '../../../../preload'
import userEvent from '@testing-library/user-event'
import wrap from 'jest-wrap'
import { RootState } from '../../../../redux/store'
import Emulators from '../../../../models/emulator/emulators/index'
import { EmulatorId } from '../../../../models/emulator/types'

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

      const initialState: RootState = {
        cellar: {
          currentCellar: {},
          i18n: {
            availableLocales: [locale],
            currentLocale: locale,
          },
        },
        emulators: {
          availableEmulatorNames: emulatorsService.buildAvailableEmulatorNamesList(),
          emulatorsInCellar: [],
          wizard: {
            emulatorCurrentlyConfigured: undefined,
            hasError: false,
            selectedEmulatorId: undefined,
          },
        },
      }
      const store = mockStore(initialState)

      createComponentWithIntlAndProviderAndRouter(
        <AddEmulator
          selectedEmulatorId={undefined}
          hasError={false}
          buildAvailableEmulatorNamesList={jest.fn()}
          createEmulator={jest.fn()}
          setWizardStatus={jest.fn()}
        />,
        { locale: locale, messages: messages },
        store
      )

      expect(screen.getByRole('heading').textContent).toEqual(
        messages['add-emulator.title']
      )
      expect(screen.getByRole('combobox').getAttribute('name')).toEqual(
        'emulator'
      )
      expect(
        screen
          .getByRole('button', { name: messages['common.back'] })
          .getAttribute('href')
      ).toEqual('/')
      expect(
        screen
          .getByRole('button', { name: messages['common.confirm'] })
          .getAttribute('type')
      ).toEqual('submit')
    })

    it('should call createEmulator() method on submit', (done) => {
      const locale = localeService.getDefaultLocale()
      const messages = localeService.getMessagesForLocale(locale)
      const mame = Emulators[0]

      const initialState: RootState = {
        cellar: {
          currentCellar: {},
          i18n: {
            availableLocales: [locale],
            currentLocale: locale,
          },
        },
        emulators: {
          availableEmulatorNames: emulatorsService.buildAvailableEmulatorNamesList(),
          emulatorsInCellar: [],
          wizard: {
            emulatorCurrentlyConfigured: mame,
            hasError: false,
            selectedEmulatorId: mame.Id,
          },
        },
      }
      const store = mockStore(initialState)

      const callback = (emulatorId: EmulatorId): void => {
        expect(emulatorId).toEqual(mame.Id)
        done()
      }

      createComponentWithIntlAndProviderAndRouter(
        <AddEmulator
          selectedEmulatorId={mame.Id}
          hasError={false}
          buildAvailableEmulatorNamesList={jest.fn()}
          createEmulator={callback}
          setWizardStatus={jest.fn()}
        />,
        { locale: locale, messages: messages },
        store
      )

      const submitButton = screen.getByRole('button', { name: 'Confirm' })
      userEvent.click(submitButton)
    })

    it('should redirect to configure emulator component on submit', () => {
      const locale = localeService.getDefaultLocale()
      const messages = localeService.getMessagesForLocale(locale)
      const mame = Emulators[0]

      const initialState: RootState = {
        cellar: {
          currentCellar: {},
          i18n: {
            availableLocales: [locale],
            currentLocale: locale,
          },
        },
        emulators: {
          availableEmulatorNames: emulatorsService.buildAvailableEmulatorNamesList(),
          emulatorsInCellar: [],
          wizard: {
            emulatorCurrentlyConfigured: mame,
            hasError: false,
            selectedEmulatorId: mame.Id,
          },
        },
      }
      const store = mockStore(initialState)

      createComponentWithIntlAndProviderAndRouter(
        <AddEmulator
          selectedEmulatorId={mame.Id}
          hasError={false}
          buildAvailableEmulatorNamesList={jest.fn()}
          createEmulator={jest.fn()}
          setWizardStatus={jest.fn()}
        />,
        { locale: locale, messages: messages },
        store
      )

      const submitButton = screen.getByRole('button', { name: 'Confirm' })
      userEvent.click(submitButton)

      expect(window.location.href).toMatch('/configure-emulator/')
    })
  })
