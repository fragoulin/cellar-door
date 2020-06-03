import React from 'react'
import CreateEmulator from './create-emulator-component'
import { screen } from '@testing-library/react'
import { createComponentWithProviderAndRouter } from 'test/createComponentsHelpers'
import configureMockStore from 'redux-mock-store'
import { CellarWin } from 'electron/preload'
import wrap from 'jest-wrap'
import Emulators from 'models/emulator/emulators/index'

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
      const mame = Emulators[0]

      createComponentWithProviderAndRouter(
        <CreateEmulator emulator={mame} />,
        mockStore()
      )

      expect(screen.getByRole('heading').textContent).toEqual(
        'createEmulator.title'
      )

      expect(screen.getByRole('table')).toBeTruthy()
      expect(
        screen
          .getByRole('button', { name: 'common.backToCellar' })
          .getAttribute('href')
      ).toEqual('/')
      expect(
        screen
          .getByRole('button', {
            name: 'createEmulator.addAnother',
          })
          .getAttribute('href')
      ).toMatch('/add-emulator/')
    })
  })
