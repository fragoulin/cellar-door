import React from 'react'
import AddEmulator from './add-emulator-component'
import { screen } from '@testing-library/react'
import { createComponentWithProviderAndRouter } from 'test/createComponentsHelpers'
import { buildAvailableEmulatorNamesList } from 'services/emulators-service'
import configureMockStore from 'redux-mock-store'
import { CellarWin } from 'electron/preload'
import userEvent from '@testing-library/user-event'
import wrap from 'jest-wrap'
import { RootState } from 'redux/store'
import Emulators from 'models/emulator/emulators/index'
import { EmulatorId } from 'models/emulator/types'

const mockStore = configureMockStore()
const mockWindow = window as CellarWin
mockWindow.api = {
  receive: jest.fn(),
  send: jest.fn(),
  sendSync: jest.fn(),
  i18nextElectronBackend: undefined,
}

wrap()
  .withGlobal('window', () => mockWindow)
  .describe('mocked window', () => {
    it('should correctly render components', () => {
      const initialState: RootState = {
        cellar: {
          present: {
            currentCellar: {},
            currentLocale: 'en',
            emulatorsInCellar: [],
            availableEmulatorNames: buildAvailableEmulatorNamesList(),
          },
          past: [],
          future: [],
        },
      }
      const store = mockStore(initialState)

      createComponentWithProviderAndRouter(
        <AddEmulator emulatorsInCellar={[]} />,
        store
      )

      expect(screen.getByRole('heading').textContent).toEqual(
        'addEmulator.title'
      )
      expect(screen.getByRole('combobox').getAttribute('name')).toEqual(
        'emulator'
      )
      expect(
        screen.getByRole('button', { name: 'common.back' }).getAttribute('href')
      ).toEqual('/')
      expect(
        screen
          .getByRole('button', { name: 'common.confirm' })
          .getAttribute('type')
      ).toEqual('submit')
    })

    xit('should redirect to configure emulator component on submit', () => {
      // TODO
      const mame = Emulators[0]
      const scummvm = Emulators[1]
      const zinc = Emulators[2]

      const initialState: RootState = {
        cellar: {
          present: {
            currentCellar: {},
            currentLocale: 'en',
            emulatorsInCellar: [],
            availableEmulatorNames: buildAvailableEmulatorNamesList(),
          },
          past: [],
          future: [],
        },
      }
      const store = mockStore(initialState)

      createComponentWithProviderAndRouter(
        <AddEmulator emulatorsInCellar={[]} />,
        store
      )

      // Select MAME option
      const select = screen.getByRole('combobox')
      userEvent.selectOptions(select, mame.shortName)
      expect(
        (screen.getByRole('option', {
          name: mame.shortName,
        }) as HTMLOptionElement).selected
      ).toBe(true)
      expect(
        (screen.getByRole('option', {
          name: scummvm.shortName,
        }) as HTMLOptionElement).selected
      ).toBe(false)
      expect(
        (screen.getByRole('option', {
          name: zinc.shortName,
        }) as HTMLOptionElement).selected
      ).toBe(false)

      // Submit
      const submitButton = screen.getByRole('button', {
        name: 'common.confirm',
      })
      userEvent.click(submitButton)

      expect(window.location.href).toMatch('/configure-emulator/')
    })
  })
