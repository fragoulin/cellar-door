import { RootState } from '../redux/store'
import { databaseService } from '../inversify/mainDependencies'

let mockResultErr: Error | null
let mockResultState: RootState | null

const stateFromDatabase: RootState = {
  cellar: {
    currentCellar: {},
    currentLocale: 'fr',
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

  databaseService.loadState().then((state) => {
    expect(state).toBeNull()
    done()
  })
})

it('should return state', (done) => {
  mockResultErr = null
  mockResultState = stateFromDatabase

  databaseService.loadState().then((state) => {
    expect(state).toEqual(stateFromDatabase)
    done()
  })
})
