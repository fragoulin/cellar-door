import { registerListeners } from '../services/ipc-main-service'
import { ipcMain } from 'electron'

it('should correctly register listeners', () => {
  const spy = jest.spyOn(ipcMain, 'on')
  registerListeners()

  expect(spy).toHaveBeenCalledTimes(3)
  expect(spy.mock.calls[0][0]).toEqual('dialogSync')
  expect(spy.mock.calls[1][0]).toEqual('getResourcesPath')
  expect(spy.mock.calls[2][0]).toEqual('isDev')

  // TODO more tests
})
