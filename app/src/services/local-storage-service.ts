import 'reflect-metadata'
import { injectable } from 'inversify'

/**
 * Local storage service is used to access browser's local storage to store and get values.
 *
 * Cannot be used in main process.
 */
@injectable()
export class LocalStorageService implements LocalStorageService {
  /**
   * Store an item in the browser's local storage.
   *
   * @param key - key of item to store.
   * @param value - value of item to store.
   * @returns a promise to fulfill or reject the store operation.
   */
  public store<T>(key: string, value: T): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        localStorage.setItem(key, JSON.stringify(value))
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  }

  /**
   * Try to retrieve a value from local storage.
   *
   * @param key - the key of the value to retrieve.
   * @returns the value retrieved from local storage, or undefined.
   */
  public get<T>(key: string): T | undefined {
    const valueJson = localStorage.getItem(key)
    if (valueJson) return JSON.parse(valueJson)
    return undefined
  }
}
