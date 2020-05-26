import { app } from 'electron'
import { RootState } from '../redux/store'
import { injectable } from 'inversify'
import 'reflect-metadata'
import path from 'path'
import Nedb = require('nedb')

/**
 * Database service definition.
 */
export interface DatabaseService {
  loadState(): Promise<RootState>
  saveState(state: RootState): Promise<RootState>
}

/**
 * User data path.
 */
const userDataPath = app.getPath('userData')

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
   * https://www.electronjs.org/docs/api/app#appgetpathname
   *
   * State database is used to persist Redux state.
   */
  public constructor() {
    this.stateDb = new Nedb({
      filename: path.join(userDataPath, 'state.db'),
      autoload: true,
      corruptAlertThreshold: 0,
    })
  }

  /**
   * Builds a promise for load state.
   *
   * @remarks
   * Nedb Id is stripped from record returned in callback.
   *
   * @returns a promise for load state.
   */
  public loadState(): Promise<RootState> {
    return new Promise((resolve, reject) => {
      this.stateDb.findOne({}, (err, state) => {
        if (err) {
          reject(err)
        } else {
          if (state) delete state._id
          resolve(state)
        }
      })
    })
  }

  /**
   * Persist specified redux state to database.
   *
   * @param state - root state to persist.
   * @param callback - function called when database update is finished.
   */
  public saveState(state: RootState): Promise<RootState> {
    return new Promise((resolve, reject) => {
      this.stateDb.update({}, state, { upsert: true }, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve(state)
        }
      })
    })
  }
}
