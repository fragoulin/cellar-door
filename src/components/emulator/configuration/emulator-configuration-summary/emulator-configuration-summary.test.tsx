import React from 'react'
import { EmulatorConfigurationSummary } from './emulator-configuration-summary'
import { unmountComponentAtNode } from 'react-dom'
import { screen } from '@testing-library/react'
import { createComponentWithIntlAndRouter } from '../../../../../test/createComponentsHelpers'
import { localeService } from '../../../../rendererDependencies'
import Emulators from '../../../../models/emulator/emulators/index'

let container: HTMLDivElement | undefined

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

it('should correctly display configurations rows', () => {
  const locale = localeService.getDefaultLocale()
  const messages = localeService.getMessagesForLocale(locale)

  const mame = Emulators[0]
  createComponentWithIntlAndRouter(
    <EmulatorConfigurationSummary configurations={mame.configurations} />,
    { locale: locale, messages: messages }
  )

  const rows = screen.getAllByRole('row')
  expect(rows).toHaveLength(mame.configurations.length)
  mame.configurations.forEach((configuration, i) => {
    expect(rows[i].textContent).toEqual(configuration.name)
  })
})
