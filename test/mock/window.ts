import { CellarWin } from 'electron/preload'

const mockWindow = window as CellarWin
mockWindow.api = {
  receive: jest.fn(),
  send: jest.fn(),
  sendSync: jest.fn(),
  i18nextElectronBackend: undefined,
}

export { mockWindow }
