import { app } from 'electron'
import { RootState } from '../redux/store'
import { injectable } from 'inversify'
import 'reflect-metadata'
import Nedb = require('nedb')

export interface DatabaseService {
  loadState (callback: (err: Error, state: RootState | null) => void): void;
  saveState (state: RootState, callback: (err: Error, numReplaced: number, upsert: boolean) => void): void;
}

@injectable()
export class NedbService implements DatabaseService {
  private stateDb: Nedb

  public constructor () {
    this.stateDb = new Nedb({
      filename: `${app.getAppPath()}/data/state.db`,
      autoload: true,
      corruptAlertThreshold: 0
    })
  }

  // Load redux state from database
  public loadState (callback: (err: Error, state: RootState | null) => void): void {
    this.stateDb.findOne({}, (err, state) => {
      if (state) {
        delete state._id
      }
      callback(err, state)
    })
  }

  // Persist specified redux state to database
  public saveState (state: RootState, callback: (err: Error, numReplaced: number, upsert: boolean) => void): void {
    this.stateDb.update({}, state, { upsert: true }, (err, numReplaced, upsert) => {
      callback(err, numReplaced, upsert)
      //      this.stateDb.persistence.compactDatafile()
    })
  }
}
