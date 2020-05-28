import React from 'react'
import ConfigureEmulator from './configure-emulator-component'
import { screen } from '@testing-library/react'
import { createComponentWithProviderAndRouter } from '../../../../../../test/createComponentsHelpers'
import configureMockStore from 'redux-mock-store'
import Emulators from '../../../../models/emulator/emulators/index'
import { CellarWin } from '../../../../../electron/preload'
import userEvent from '@testing-library/user-event'
import wrap from 'jest-wrap'

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
    it('should display correct message when emulator is missing', () => {
      createComponentWithProviderAndRouter(
        <ConfigureEmulator
          emulator={undefined}
          hasError={false}
          setWizardStatus={jest.fn()}
          updateEmulatorConfiguration={jest.fn()}
        />,
        mockStore()
      )

      expect(screen.getByText('configureEmulator.notFound')).toBeTruthy()
    })

    it('should redirect to add emulator component when clicking on back button', () => {
      const mame = Emulators[0]

      createComponentWithProviderAndRouter(
        <ConfigureEmulator
          emulator={mame}
          hasError={false}
          setWizardStatus={jest.fn()}
          updateEmulatorConfiguration={jest.fn()}
        />,
        mockStore()
      )

      const backButton = screen.getByRole('button', {
        name: 'common.back',
      }) as HTMLAnchorElement
      expect(backButton.href).toMatch('/add-emulator/')
    })

    it('should have submit button', () => {
      const mame = Emulators[0]

      createComponentWithProviderAndRouter(
        <ConfigureEmulator
          emulator={mame}
          hasError={false}
          setWizardStatus={jest.fn()}
          updateEmulatorConfiguration={jest.fn()}
        />,
        mockStore()
      )

      const confirmButton = screen.getByRole('button', {
        name: 'common.confirm',
      }) as HTMLAnchorElement
      expect(confirmButton.type).toEqual('submit')
    })

    it('should render select directory components according to provided emulator', () => {
      const mame = Emulators[0]

      createComponentWithProviderAndRouter(
        <ConfigureEmulator
          emulator={mame}
          hasError={false}
          setWizardStatus={jest.fn()}
          updateEmulatorConfiguration={jest.fn()}
        />,
        mockStore()
      )

      const textboxes = screen.getAllByRole('textbox')
      expect(textboxes).toHaveLength(mame.configurations.length)
    })

    it('should call api.send() when clicking on select directory buttons', (done) => {
      const mame = Emulators[0]

      createComponentWithProviderAndRouter(
        <ConfigureEmulator
          emulator={mame}
          hasError={false}
          setWizardStatus={jest.fn()}
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
