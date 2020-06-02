import { registerListeners } from '../services/ipc-main-service'
import { ipcMain } from 'electron'
import { DialogSyncChannel, getResourcesPathChannel, isDevChannel } from 'app/electron/constants'

it('should correctly register listeners', () => {
  const spy = jest.spyOn(ipcMain, 'on')
  registerListeners()

  expect(spy).toHaveBeenCalledTimes(3)
  expect(spy.mock.calls[0][0]).toEqual(DialogSyncChannel)
  expect(spy.mock.calls[1][0]).toEqual(getResourcesPathChannel)
  expect(spy.mock.calls[2][0]).toEqual(isDevChannel)

  // TODO more tests
})
