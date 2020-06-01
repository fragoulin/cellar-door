import React from 'react'
import AddEmulator from './add-emulator-component'
import { screen } from '@testing-library/react'
import { createComponentWithProviderAndRouter } from '../../../../../../test/createComponentsHelpers'
import { buildAvailableEmulatorNamesList } from '../../../../services/emulators-service'
import configureMockStore from 'redux-mock-store'
import { CellarWin } from '../../../../../electron/preload'
import userEvent from '@testing-library/user-event'
import wrap from 'jest-wrap'
import { RootState } from '../../../../redux/store'
import Emulators from '../../../../models/emulator/emulators/index'
import { EmulatorId } from '../../../../models/emulator/types'

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
          currentCellar: {},
          currentLocale: 'en',
          emulatorsInCellar: [],
        },
        emulators: {
          availableEmulatorNames: buildAvailableEmulatorNamesList(),
          wizard: {
            emulatorCurrentlyConfigured: undefined,
            hasError: false,
            selectedEmulatorId: undefined,
          },
        },
      }
      const store = mockStore(initialState)

      createComponentWithProviderAndRouter(
        <AddEmulator
          selectedEmulatorId={undefined}
          hasError={false}
          buildAvailableEmulatorNamesList={jest.fn()}
          createEmulator={jest.fn()}
          setWizardStatus={jest.fn()}
        />,
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

    it('should call createEmulator() method on submit', (done) => {
      const mame = Emulators[0]

      const initialState: RootState = {
        cellar: {
          currentCellar: {},
          currentLocale: 'en',
          emulatorsInCellar: [],
        },
        emulators: {
          availableEmulatorNames: buildAvailableEmulatorNamesList(),
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

      createComponentWithProviderAndRouter(
        <AddEmulator
          selectedEmulatorId={mame.Id}
          hasError={false}
          buildAvailableEmulatorNamesList={jest.fn()}
          createEmulator={callback}
          setWizardStatus={jest.fn()}
        />,
        store
      )

      const submitButton = screen.getByRole('button', {
        name: 'common.confirm',
      })
      userEvent.click(submitButton)
    })

    it('should redirect to configure emulator component on submit', () => {
      const mame = Emulators[0]

      const initialState: RootState = {
        cellar: {
          currentCellar: {},
          currentLocale: 'en',
          emulatorsInCellar: [],
        },
        emulators: {
          availableEmulatorNames: buildAvailableEmulatorNamesList(),
          wizard: {
            emulatorCurrentlyConfigured: mame,
            hasError: false,
            selectedEmulatorId: mame.Id,
          },
        },
      }
      const store = mockStore(initialState)

      createComponentWithProviderAndRouter(
        <AddEmulator
          selectedEmulatorId={mame.Id}
          hasError={false}
          buildAvailableEmulatorNamesList={jest.fn()}
          createEmulator={jest.fn()}
          setWizardStatus={jest.fn()}
        />,
        store
      )

      const submitButton = screen.getByRole('button', {
        name: 'common.confirm',
      })
      userEvent.click(submitButton)

      expect(window.location.href).toMatch('/configure-emulator/')
    })
  })
