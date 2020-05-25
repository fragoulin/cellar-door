import React from 'react'
import SelectDirectory from './select-directory-component'
import { screen } from '@testing-library/react'
import { createComponentWithProviderAndRouter } from '../../../../../test/createComponentsHelpers'
import configureMockStore from 'redux-mock-store'
import { CellarWin } from '../../../../electron/preload'
import userEvent from '@testing-library/user-event'
import wrap from 'jest-wrap'

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
    it('should correctly render input and button', () => {
      const name = 'test'

      createComponentWithProviderAndRouter(
        <SelectDirectory
          name={name}
          hasError={false}
          mandatory={true}
          onDirectorySelected={jest.fn()}
        />,
        mockStore()
      )

      const input = screen.getByRole('textbox')
      expect(input.getAttribute('required')).toEqual('')
      expect(input.getAttribute('readonly')).toEqual('')
      expect((input as HTMLInputElement).value).toEqual('')

      const directorySelector = screen.getByRole(name)
      expect(directorySelector.getAttribute('aria-label')).toEqual(
        'selectDirectory.label'
      )
    })

    it('should open dialog on click', (done) => {
      const name = 'test'

      createComponentWithProviderAndRouter(
        <SelectDirectory
          name={name}
          hasError={false}
          mandatory={true}
          onDirectorySelected={jest.fn()}
        />,
        mockStore()
      )

      mockWindow.api.send = (
        type: string,
        _inputId: string,
        properties: { properties: ['openDirectory', 'dontAddToRecent'] }
      ): void => {
        expect(type).toEqual('dialogSync')
        expect(properties.properties[0]).toEqual('openDirectory')
        expect(properties.properties[1]).toEqual('dontAddToRecent')
        done()
      }

      const directorySelector = screen.getByRole(name)
      userEvent.click(directorySelector)
    })

    it('should display error message in case of error', () => {
      const name = 'test'

      createComponentWithProviderAndRouter(
        <SelectDirectory
          name={name}
          hasError={true}
          mandatory={true}
          onDirectorySelected={jest.fn()}
        />,
        mockStore()
      )

      expect(screen.getByRole('alert')).toBeTruthy()
    })
  })
