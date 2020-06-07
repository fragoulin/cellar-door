import { registerListeners } from 'services/ipc-main-service'
import { ipcMain } from 'electron'
import {
  DialogOpenSyncChannel,
  getResourcesPathChannel,
  isDevChannel,
} from 'electron/constants'

// TODO
xit('should correctly register listeners', () => {
  const spy = jest.spyOn(ipcMain, 'on')
  registerListeners()

  expect(spy).toHaveBeenCalledTimes(3)
  expect(spy.mock.calls[0][0]).toEqual(DialogOpenSyncChannel)
  expect(spy.mock.calls[1][0]).toEqual(getResourcesPathChannel)
  expect(spy.mock.calls[2][0]).toEqual(isDevChannel)

  // TODO more tests
})
