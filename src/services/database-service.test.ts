import { RootState } from '../redux/store'
import { databaseService } from '../mainDependencies'

let mockResultErr: Error | null
let mockResultState: RootState | null

const stateFromDatabase: RootState = {
  cellar: {
    currentCellar: {},
    i18n: {
      availableLocales: ['en', 'fr'],
      currentLocale: 'fr',
    },
  },
  emulators: {
    availableEmulatorNames: [],
    emulatorsInCellar: [],
    wizard: {
      hasError: false,
      emulatorCurrentlyConfigured: undefined,
      selectedEmulatorId: undefined,
    },
  },
}

jest.mock('nedb', () => {
  return jest.fn().mockImplementation(() => {
    return {
      findOne: (
        _query: unknown,
        callback: (err: Error | null, state: RootState | null) => void
      ): void => {
        callback(mockResultErr, mockResultState)
      },
    }
  })
})

it('should return null with empty state', (done) => {
  mockResultErr = null
  mockResultState = null

  const callback = (err: Error, state: RootState | null): void => {
    expect(err).toBeNull()
    expect(state).toBeNull()
    done()
  }

  databaseService.loadState(callback)
})

it('should return state', (done) => {
  mockResultErr = null
  mockResultState = stateFromDatabase

  const callback = (err: Error, state: RootState | null): void => {
    expect(err).toBeNull()
    expect(state).toEqual(stateFromDatabase)
    done()
  }

  databaseService.loadState(callback)
})
