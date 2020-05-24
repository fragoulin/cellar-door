/**
 * Inversify types for main and renderer processes.
 */
const TYPES = {
  DatabaseService: Symbol.for('DatabaseService'),
  EmulatorsService: Symbol.for('EmulatorsService'),
  IpcMainService: Symbol.for('IpcMainService'),
  MenuService: Symbol.for('MenuService'),
}

export { TYPES }
