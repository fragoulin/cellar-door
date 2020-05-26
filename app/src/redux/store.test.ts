import * as store from './store'
import { CellarWin } from '../../electron/preload'
import { emulatorsService } from '../inversify/rendererDependencies'
import { RootState } from './store'

const mockWindow = window as CellarWin

beforeEach(() => {
  mockWindow.api = {
    receive: jest.fn(),
    send: jest.fn(),
    i18nextElectronBackend: undefined,
  }
})

afterEach(() => {
  mockWindow.api.receive = jest.fn()
  mockWindow.api.send = jest.fn()
})

it('should trigger state loading when calling whenReady function', (done) => {
  mockWindow.api.send = (name: string): void => {
    expect(name).toEqual('loadState')
    done()
  }

  store.whenReady()
})

it('should correctly handle error when calling whenReady function', (done) => {
  const errorMessage = 'expected error'
  mockWindow.api.receive = (name: string, callback: Function): void => {
    expect(name).toEqual('stateLoaded')
    callback(new Error(errorMessage))
  }

  store.whenReady().catch((err) => {
    expect((err as Error).name).toBe('Error')
    expect((err as Error).message).toBe(errorMessage)
    done()
  })
})

it('should correctly handle undefined state result when calling whenReady function', (done) => {
  const emptyState: RootState = {
    cellar: {
      currentCellar: undefined,
      currentLocale: 'en',
    },
    emulators: {
      availableEmulatorNames: [],
      emulatorsInCellar: [],
      wizard: {
        emulatorCurrentlyConfigured: undefined,
        hasError: false,
        selectedEmulatorId: undefined,
      },
    },
  }

  mockWindow.api.receive = (name: string, callback: Function): void => {
    expect(name).toEqual('stateLoaded')
    callback(undefined, undefined)
  }

  store.whenReady().then((store) => {
    expect(store.getState()).toEqual(emptyState)
    done()
  })
})

it('should correctly handle existing state result when calling whenReady function', (done) => {
  const state: RootState = {
    cellar: {
      currentCellar: {},
      currentLocale: 'en',
    },
    emulators: {
      availableEmulatorNames: emulatorsService.buildAvailableEmulatorNamesList(),
      emulatorsInCellar: [],
      wizard: {
        emulatorCurrentlyConfigured: undefined,
        hasError: false,
        selectedEmulatorId: undefined,
      },
    },
  }

  mockWindow.api.receive = (name: string, callback: Function): void => {
    expect(name).toEqual('stateLoaded')
    callback(undefined, state)
  }

  store.whenReady().then((store) => {
    expect(store.getState()).toEqual(state)
    expect(store.getState()).not.toBe(state)
    done()
  })
})
