import React from 'react'
import EmulatorsSelect from './emulators-select-component'
import { screen } from '@testing-library/react'
import { createComponentWithRouter } from '../../../../../test/createComponentsHelpers'
import { emulatorsService } from '../../../../rendererDependencies'
import Emulators from '../../../../models/emulator/emulators/index'
import { EmulatorId } from 'src/models/emulator/types'
import userEvent from '@testing-library/user-event'

it('should correctly render emulators select', () => {
  const emulatorsIdsToNames = emulatorsService.buildAvailableEmulatorNamesList()

  createComponentWithRouter(
    <EmulatorsSelect
      availableEmulatorNames={emulatorsIdsToNames}
      hasError={false}
      setSelectedEmulatorId={jest.fn()}
    />
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

  const emulatorsIdsToNames = emulatorsService.buildAvailableEmulatorNamesList()

  createComponentWithRouter(
    <EmulatorsSelect
      availableEmulatorNames={emulatorsIdsToNames}
      hasError={false}
      setSelectedEmulatorId={callback}
    />
  )

  const select = screen.getByRole('combobox')
  userEvent.selectOptions(select, mameId)
})
