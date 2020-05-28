import { ipcMainService } from '../inversify/mainDependencies'
import { ipcMain } from 'electron'

it('should correctly register listeners', () => {
  const spy = jest.spyOn(ipcMain, 'on')
  ipcMainService.registerListeners()

  expect(spy).toHaveBeenCalledTimes(2)
  expect(spy.mock.calls[0][0]).toEqual('dialogSync')
  expect(spy.mock.calls[1][0]).toEqual('getResourcesPath')

  // TODO more tests
})
