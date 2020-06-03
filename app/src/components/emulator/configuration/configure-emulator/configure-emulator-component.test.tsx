import React from 'react'
import ConfigureEmulator from './configure-emulator-component'
import { screen } from '@testing-library/react'
import { createComponentWithProviderAndRouter } from 'test/createComponentsHelpers'
import configureMockStore from 'redux-mock-store'
import Emulators from 'models/emulator/emulators/index'
import { CellarWin } from 'electron/preload'
import userEvent from '@testing-library/user-event'
import wrap from 'jest-wrap'
import { DialogSyncChannel } from 'electron/constants'

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
    // TODO
    xit('should display correct message when emulator is missing', () => {
      /*      createComponentWithProviderAndRouter(
        <ConfigureEmulator
          addEmulatorToCellar={jest.fn()}
        />,
        mockStore()
      )

      expect(screen.getByText('configureEmulator.notFound')).toBeTruthy()
      */
    })

    xit('should redirect to add emulator component when clicking on back button', () => {
      /*
      const mame = Emulators[0]

      createComponentWithProviderAndRouter(
        <ConfigureEmulator
          emulator={mame}
          addEmulatorToCellar={jest.fn()}
        />,
        mockStore()
        
      )

      const backButton = screen.getByRole('button', {
        name: 'common.back',
      }) as HTMLAnchorElement
      expect(backButton.href).toMatch('/add-emulator/') */
    })

    xit('should have submit button', () => {
      /*      const mame = Emulators[0]

      createComponentWithProviderAndRouter(
        <ConfigureEmulator
          emulator={mame}
          updateEmulatorConfiguration={jest.fn()}
        />,
        mockStore()
      )

      const confirmButton = screen.getByRole('button', {
        name: 'common.confirm',
      }) as HTMLAnchorElement
      expect(confirmButton.type).toEqual('submit') */
    })

    xit('should render select directory components according to provided emulator', () => {
      /*      const mame = Emulators[0]

      createComponentWithProviderAndRouter(
        <ConfigureEmulator
          emulator={mame}
          updateEmulatorConfiguration={jest.fn()}
        />,
        mockStore()
      )

      const textboxes = screen.getAllByRole('textbox')
      expect(textboxes).toHaveLength(mame.configuration.length) */
    })

    xit('should call api.send() when clicking on select directory buttons', (done) => {
      /*      const mame = Emulators[0]

      createComponentWithProviderAndRouter(
        <ConfigureEmulator
          emulator={mame}
          updateEmulatorConfiguration={jest.fn()}
        />,
        mockStore()
      )

      let sendCalls = 0
      mockWindow.api.send = (
        type: string,
        _inputId: string,
        properties: { properties: ['openDirectory', 'dontAddToRecent'] }
      ): void => {
        expect(type).toEqual(DialogSyncChannel)
        expect(properties.properties[0]).toEqual('openDirectory')
        expect(properties.properties[1]).toEqual('dontAddToRecent')
        if (++sendCalls === mame.configuration.length) {
          done()
        }
      }

      mame.configuration.forEach((configuration) => {
        const button = screen.getByRole(configuration.name)
        userEvent.click(button)
      }) */
    })
  })
