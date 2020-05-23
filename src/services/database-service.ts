import { app } from 'electron'
import { RootState } from '../redux/store'
import { injectable } from 'inversify'
import 'reflect-metadata'
import Nedb = require('nedb')

/**
 * Database service definition.
 */
export interface DatabaseService {
  loadState(callback: (err: Error, state: RootState | null) => void): void
  saveState(
    state: RootState,
    callback: (err: Error, numReplaced: number, upsert: boolean) => void
  ): void
}

/**
 * Nedb implementation of database service.
 */
@injectable()
export class NedbService implements DatabaseService {
  private stateDb: Nedb

  /**
   * Create databases.
   *
   * @remarks
   * State database is used to persist Redux state.
   */
  public constructor() {
    this.stateDb = new Nedb({
      filename: `${app.getAppPath()}/data/state.db`,
      autoload: true,
      corruptAlertThreshold: 0,
    })
  }

  /**
   * Load redux state from database.
   *
   * @remarks
   * Nedb Id is stripped from record returned in callback.
   *
   * @param callback - function called when request is finished.
   */
  public loadState(
    callback: (err: Error, state: RootState | null) => void
  ): void {
    this.stateDb.findOne({}, (err, state) => {
      if (state) {
        delete state._id
      }
      callback(err, state)
    })
  }

  /**
   * Persist specified redux state to database.
   *
   * @param state - root state to persist.
   * @param callback - function called when database update is finished.
   */
  public saveState(
    state: RootState,
    callback: (err: Error, numReplaced: number, upsert: boolean) => void
  ): void {
    this.stateDb.update(
      {},
      state,
      { upsert: true },
      (err, numReplaced, upsert) => {
        callback(err, numReplaced, upsert)
      }
    )
  }
}
