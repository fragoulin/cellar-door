import { createStore, combineReducers, applyMiddleware, Store } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { cellarReducer } from './modules/cellar'
import { emulatorsReducer } from './modules/emulators'

const rootReducer = combineReducers({
  cellar: cellarReducer,
  emulators: emulatorsReducer
})

export type RootState = ReturnType<typeof rootReducer>

const middleware = process.env.NODE_ENV !== 'production'
  ? [require('redux-immutable-state-invariant').default(), thunk]
  : [thunk]

export default createStore(
  rootReducer,
  applyMiddleware(...middleware, logger)
) as Store
