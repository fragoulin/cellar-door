export const app = {
  getAppPath: jest.fn(),
}

export const ipcMain = {
  on: jest.fn(),
}

export const win = {
  api: {
    send: jest.fn(),
    receive: jest.fn(),
  },
}
