import React from 'react'
import FreshInstallation from './fresh-installation-component'
import { screen } from '@testing-library/react'
import { createComponentWithRouter } from 'test/createComponentsHelpers'

it('should create cellar after component mount', (done) => {
  const callback = (): void => {
    done()
  }

  createComponentWithRouter(<FreshInstallation createCellar={callback} />)
})

export const testComponents = (): void => {
  expect(screen.getByRole('note').textContent).toEqual('freshInstallation.text')
  const button = screen.getByRole('button') as HTMLAnchorElement
  expect(button.textContent).toEqual('freshInstallation.buttonText')
  expect(button.href).toMatch('/add-emulator/')
}

it('should correctly render note and button', () => {
  const callback = jest.fn()

  createComponentWithRouter(<FreshInstallation createCellar={callback} />)

  testComponents()
})
