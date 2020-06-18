import { ipcMain } from 'electron'
import {
  ParseMameIni,
  MameIniParsed,
  GetPropertyFromMameIni,
  PropertyFromMameIniRetrieved,
  GetRomsList,
  RomsListRetrieved,
} from './constants'
import { parseIni as mameIniParser, getPropertyFromMameIni } from './parser'
import { EmulatorConfiguration } from 'models/emulator/types'
import { getRomsList, getSnaps } from './services/main'
import { GetSnap, SnapRetrieved } from 'electron/constants'
import * as unzip from 'unzipper'

/**
 * Registers listeners for IPC on main process.
 */
function registerListeners(): void {
  ipcMain
    .on(
      // Parse mame.ini file
      ParseMameIni,
      async (event, mameDirectory: string) => {
        mameIniParser(mameDirectory).then((mameIni) => {
          event.reply(MameIniParsed, mameIni)
        })
      }
    )
    .on(
      // Get property from mame.ini file
      GetPropertyFromMameIni,
      async (event, mameDirectory: string, propertyName: string) => {
        getPropertyFromMameIni(mameDirectory, propertyName)
          .then((value) => {
            event.reply(PropertyFromMameIniRetrieved, value)
          })
          .catch((error) => {
            console.error(error)
            event.reply(PropertyFromMameIniRetrieved, undefined)
          })
      }
    )
    .on(GetRomsList, async (event, mameDirectory: string) => {
      getRomsList(mameDirectory)
        .then((roms) => {
          event.reply(RomsListRetrieved, roms)
        })
        .catch((error) => {
          console.error(error)
          event.reply(RomsListRetrieved, undefined)
        })
    })
    .on(GetSnap, async (event, configuration: EmulatorConfiguration[]) => {
      getSnaps(configuration)
        .then((result) => {
          const stream = result[0]
          const entriesNumber = result[1]
          stream.on('entry', (entry: unzip.Entry) => {
            const romName = entry.path.replace(/\.[^/.]+$/, '')
            entry.once('data', (data: Buffer) => {
              const snap = data.toString('base64')
              event.reply(SnapRetrieved, romName, snap, entriesNumber)
            })
          })
        })
        .catch((error) => {
          event.reply(
            SnapRetrieved,
            undefined,
            undefined,
            undefined,
            new Error(error)
          )
        })
    })
}

export { registerListeners }
