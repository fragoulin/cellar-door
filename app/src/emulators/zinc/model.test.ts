import { EmulatorId } from 'models/emulator/types'
import Zinc from './model'

it('should have correct Id', () => {
  expect(Zinc.Id).toBe(EmulatorId.ZiNc)
})

it('should have correct short name', () => {
  expect(Zinc.shortName).toBe('ZiNc')
})

it('should have correct full name', () => {
  expect(Zinc.fullName).toBeUndefined()
})

it('should have correct description', () => {
  expect(Zinc.description).toBe(
    'ZiNc is a command line emulator that focuses in emulating the ZN1, ZN2 and System 11 arcade hardware which are based on Playstation hardware.'
  )
})

it('should have correct URL', () => {
  expect(Zinc.URL).toBe('http://www.emulator-zone.com/doc.php/arcade/zinc.html')
})

it('should have correct configuration', () => {
  expect(Zinc.configuration).toHaveLength(2)
  expect(Zinc.configuration[0].name).toBe('zincDirectory')
  expect(Zinc.configuration[0].value).toBeUndefined()
  expect(Zinc.configuration[0].mandatory).toBe(true)
  expect(Zinc.configuration[1].name).toBe('romsDirectory')
  expect(Zinc.configuration[1].value).toBeUndefined()
  expect(Zinc.configuration[1].mandatory).toBe(true)
})

it('should have no licences', () => {
  expect(Zinc.licences).toBeUndefined()
})
