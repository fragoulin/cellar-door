/**
 * Inversify types for main and renderer processes.
 */
const TYPES = {
  EmulatorsService: Symbol.for('EmulatorsService'),
  IpcMainService: Symbol.for('IpcMainService'),
  LocalStorageService: Symbol.for('LocalStorageService'),
}

export { TYPES }
