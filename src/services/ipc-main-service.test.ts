import { ipcMainService } from '../inversify/mainDependencies'
import { ipcMain } from 'electron'

jest.mock('nedb')

it('should correctly register listeners', () => {
  const spy = jest.spyOn(ipcMain, 'on')
  ipcMainService.registerListeners()

  expect(spy).toHaveBeenCalledTimes(4)
  expect(spy.mock.calls[0][0]).toEqual('dialogSync')
  expect(spy.mock.calls[1][0]).toEqual('saveState')
  expect(spy.mock.calls[2][0]).toEqual('loadState')
  expect(spy.mock.calls[3][0]).toEqual('updateLanguage')

  // TODO more tests
})
