import React from 'react'
import ConfigureEmulator, { MatchParams } from './configure-emulator-component'
import { screen } from '@testing-library/react'
import { createComponentWithProviderAndRouter } from 'test/createComponentsHelpers'
import configureMockStore from 'redux-mock-store'
import Emulators from 'models/emulator/emulators/index'
import userEvent from '@testing-library/user-event'
import wrap from 'jest-wrap'
import { DialogOpenSyncChannel } from 'electron/constants'
import { mockWindow } from 'test/mock/window'
import * as H from 'history'
import { match } from 'react-router-dom'

const mockStore = configureMockStore()

wrap()
  .withGlobal('window', () => mockWindow)
  .describe('mocked window', () => {
    it('should display correct message when emulator is missing', () => {
      createComponentWithProviderAndRouter(
        <ConfigureEmulator
          addEmulatorToCellar={jest.fn()}
          history={{} as H.History}
          location={{} as H.Location}
          match={
            {
              params: {
                id: '',
              },
            } as match<MatchParams>
          }
        />,
        mockStore()
      )

      expect(screen.getByText('configureEmulator.notFound')).toBeTruthy()
    })

    it('should redirect to add emulator component when clicking on back button', () => {
      const mame = Emulators[0]

      createComponentWithProviderAndRouter(
        <ConfigureEmulator
          addEmulatorToCellar={jest.fn()}
          history={{} as H.History}
          location={{} as H.Location}
          match={
            {
              params: {
                id: mame.Id,
              },
            } as match<MatchParams>
          }
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
          addEmulatorToCellar={jest.fn()}
          history={{} as H.History}
          location={{} as H.Location}
          match={
            {
              params: {
                id: mame.Id,
              },
            } as match<MatchParams>
          }
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
          addEmulatorToCellar={jest.fn()}
          history={{} as H.History}
          location={{} as H.Location}
          match={
            {
              params: {
                id: mame.Id,
              },
            } as match<MatchParams>
          }
        />,
        mockStore()
      )

      const textboxes = screen.getAllByRole('textbox')
      expect(textboxes).toHaveLength(mame.configuration.length)
    })

    it('should call api.send() when clicking on select directory buttons', (done) => {
      const mame = Emulators[0]

      createComponentWithProviderAndRouter(
        <ConfigureEmulator
          addEmulatorToCellar={jest.fn()}
          history={{} as H.History}
          location={{} as H.Location}
          match={
            {
              params: {
                id: mame.Id,
              },
            } as match<MatchParams>
          }
        />,
        mockStore()
      )

      let sendCalls = 0
      mockWindow.api.send = (
        type: string,
        _inputId: string,
        properties: { properties: ['openDirectory', 'dontAddToRecent'] }
      ): void => {
        expect(type).toEqual(DialogOpenSyncChannel)
        expect(properties.properties[0]).toEqual('openDirectory')
        expect(properties.properties[1]).toEqual('dontAddToRecent')
        if (++sendCalls === mame.configuration.length) {
          done()
        }
      }

      mame.configuration.forEach((configuration) => {
        const button = screen.getByRole(configuration.name)
        userEvent.click(button)
      })
    })
  })
