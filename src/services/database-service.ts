import { app } from 'electron'
import { RootState } from '../redux/store'
import NeDB = require('nedb')

const stateDb = new NeDB({
  filename: `${app.getAppPath()}/data/state.db`,
  autoload: true,
  corruptAlertThreshold: 0
})

// Load redux state from database
export const loadState = (callback: (err: Error, state: RootState | null) => void): void => {
  stateDb.findOne({}, (err, state) => {
    if (state) {
      delete state._id
    }
    callback(err, state)
  })
}

// Persist specified redux state to database
export const saveState = (state: RootState, callback: (err: Error, numReplaced: number, upsert: boolean) => void): void => {
  stateDb.update({}, state, { upsert: true }, (err, numReplaced, upsert) => {
    callback(err, numReplaced, upsert)
    stateDb.persistence.compactDatafile()
  })
}
