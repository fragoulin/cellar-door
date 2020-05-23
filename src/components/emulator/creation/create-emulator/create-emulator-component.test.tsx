import React from 'react'
import CreateEmulator from './create-emulator-component'
import { screen } from '@testing-library/react'
import { createComponentWithProviderAndRouter } from '../../../../../test/createComponentsHelpers'
import configureMockStore from 'redux-mock-store'
import { CellarWin } from '../../../../preload'
import wrap from 'jest-wrap'
import Emulators from '../../../../models/emulator/emulators/index'
import { Emulator } from '../../../../models/emulator/types'

const mockStore = configureMockStore()
const mockWindow = window as CellarWin
mockWindow.api = {
  receive: jest.fn(),
  send: jest.fn(),
  i18nextElectronBackend: undefined,
}

wrap()
  .withGlobal('window', () => mockWindow)
  .describe('mocked window', () => {
    it('should correctly render components', () => {
      const mame = Emulators[0]

      createComponentWithProviderAndRouter(
        <CreateEmulator emulator={mame} addEmulatorToCellar={jest.fn()} />,
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

    it('should call addEmulatorToCellar() method', (done) => {
      const mame = Emulators[0]
      const callback = (emulator: Emulator): void => {
        expect(emulator.Id).toEqual(mame.Id)
        done()
      }

      createComponentWithProviderAndRouter(
        <CreateEmulator emulator={mame} addEmulatorToCellar={callback} />,
        mockStore()
      )
    })

    it('should correctly handle undefined emulator', (done) => {
      const callback = (): void => {
        done.fail('Should not be called')
      }

      createComponentWithProviderAndRouter(
        <CreateEmulator emulator={undefined} addEmulatorToCellar={callback} />,
        mockStore()
      )

      done()
    })
  })
