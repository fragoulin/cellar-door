import React from 'react'
import { EmulatorsSelect } from './emulators-select-component'
import { unmountComponentAtNode } from 'react-dom'
import { screen } from '@testing-library/react'
import { createComponentWithIntlAndRouter } from '../../../../../test/createComponentsHelpers'
import {
  localeService,
  emulatorsService,
} from '../../../../rendererDependencies'
import Emulators from '../../../../models/emulator/emulators/index'
import { EmulatorId } from 'src/models/emulator/types'
import userEvent from '@testing-library/user-event'

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

it('should correctly render emulators select', () => {
  const locale = localeService.getDefaultLocale()
  const messages = localeService.getMessagesForLocale(locale)
  const emulatorsIdsToNames = emulatorsService.buildAvailableEmulatorNamesList()

  createComponentWithIntlAndRouter(
    <EmulatorsSelect
      availableEmulatorNames={emulatorsIdsToNames}
      hasError={false}
      setSelectedEmulatorId={jest.fn()}
    />,
    { locale: locale, messages: messages }
  )

  const options = screen.getAllByRole('option')
  expect(options).toHaveLength(Emulators.length + 1) // 'None' choice in addition to other emulators
  options
    .filter((option) => option.textContent !== '')
    .forEach((option, i) => {
      expect(option.textContent).toEqual(Emulators[i].shortName)
      expect((option as HTMLOptionElement).value).toEqual(Emulators[i].Id)
    })
})

it('should call setSelectedEmulatorId() method when MAME is selected', (done) => {
  const mameId = Emulators[0].Id

  const callback = (emulatorId: EmulatorId): void => {
    expect(emulatorId).toEqual(mameId)
    done()
  }

  const locale = localeService.getDefaultLocale()
  const messages = localeService.getMessagesForLocale(locale)
  const emulatorsIdsToNames = emulatorsService.buildAvailableEmulatorNamesList()

  createComponentWithIntlAndRouter(
    <EmulatorsSelect
      availableEmulatorNames={emulatorsIdsToNames}
      hasError={false}
      setSelectedEmulatorId={callback}
    />,
    { locale: locale, messages: messages }
  )

  const select = screen.getByRole('combobox')
  userEvent.selectOptions(select, mameId)
})
