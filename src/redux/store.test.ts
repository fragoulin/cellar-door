import * as store from './store'
import { CellarWin } from '../electron/preload'
import { emulatorsService } from '../inversify/rendererDependencies'
import { RootState } from './store'

const mockWindow = window as CellarWin

const emptyState: RootState = {
  cellar: {
    currentCellar: undefined,
    i18n: {
      availableLocales: [],
      currentLocale: 'en',
    },
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

const state: RootState = {
  cellar: {
    currentCellar: {},
    i18n: {
      availableLocales: ['en', 'fr'],
      currentLocale: 'en',
    },
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

beforeEach(() => {
  mockWindow.api = {
    receive: jest.fn(),
    send: jest.fn(),
    i18nextElectronBackend: undefined,
  }
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
  mockWindow.api.receive = (name: string, callback: Function): void => {
    expect(name).toEqual('stateLoaded')
    callback(undefined, undefined)
  }

  store.whenReady().then((store) => {
    expect(store.getState()).toEqual(emptyState)
    done()
  })
})

it('should correctly handle state result when calling whenReady function', (done) => {
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
