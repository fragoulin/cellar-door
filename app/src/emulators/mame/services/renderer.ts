// This file is only valid for renderer process.

import { CellarWin } from 'electron/preload'
import {
  ParseMameIni,
  MameIniParsed,
  RomsListRetrieved,
  GetRomsList,
} from '../constants'
import { MameIni } from '../types'

/**
 * Cellar win definition to type api object.
 */
const win = window as CellarWin

/**
 * Retrieve content of mame.ini file.
 *
 * @param mameDirectory - directory containing mame.ini file.
 * @returns an object containing mame.ini content.
 */
function getMameIniContent(mameDirectory: string): Promise<MameIni> {
  return new Promise((resolve) => {
    win.api.receive(MameIniParsed, (mameIni: MameIni) => {
      resolve(mameIni)
    })
    win.api.send(ParseMameIni, mameDirectory)
  })
}

/**
 * Retrieve list of roms file names (without leading path).
 *
 * @param mameDirectory - directory containing mame.ini file.
 * @returns a promise containing roms list.
 */
function getRomsList(mameDirectory: string): Promise<string[] | undefined> {
  return new Promise((resolve) => {
    win.api.receive(RomsListRetrieved, (roms: string[] | undefined) => {
      resolve(roms)
    })
    win.api.send(GetRomsList, mameDirectory)
  })
}

export { getMameIniContent, getRomsList }
