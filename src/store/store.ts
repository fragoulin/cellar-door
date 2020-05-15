import { createStore, combineReducers, applyMiddleware } from 'redux'
import { cellarReducer } from './cellar/reducers'
import { emulatorsReducer } from './emulators/reducers'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

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
)
