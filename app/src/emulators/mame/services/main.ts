import { getPropertyFromMameIni } from '../parser'
import glob from 'glob'
import { EmulatorConfiguration } from 'models/emulator/types'
import path from 'path'
import fs from 'fs'
import * as unzip from 'unzipper'

// This file is only valid for main process.

/**
 * Try to retrieve roms list using property rompath from mame.ini file.
 *
 * @param mameDirectory - mame directory containing mame.ini file.
 * @returns promise with roms list
 */
function getRomsList(mameDirectory: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    getPropertyFromMameIni(mameDirectory, 'rompath')
      .then((romsPath) => {
        const options: glob.IOptions = {
          cwd: romsPath as string,
          nocase: true,
          nonull: false,
          strict: true,
        }
        glob('*.zip', options, (error, files) => {
          if (error) {
            reject(error)
          } else {
            files.forEach((rom) => rom.replace(/\.[^/.]+$/, ''))
            resolve(files)
          }
        })
      })
      .catch(reject)
  })
}

function countEntries(zipFilePath: string): Promise<number> {
  return new Promise((resolve, reject) => {
    unzip.Open.file(zipFilePath)
      .then((directory) => {
        resolve(directory.files.length)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/**
 * Try to retrieve snaps.
 *
 * @param emulatorConfiguration - basic emulator configuration to use to build configuration.
 * @returns a promise when snap has been retrieved or not.
 */
function getSnaps(
  configuration: EmulatorConfiguration[]
): Promise<[unzip.ParseStream, number]> {
  return new Promise((resolve, reject) => {
    const mameDirectory = configuration[0].value
    if (!mameDirectory) {
      reject(new Error('MAME directory missing'))
      return
    }
    const extrasDirectory =
      configuration.length > 1 && configuration[1].value
        ? configuration[1].value
        : undefined
    if (!extrasDirectory) {
      reject(new Error('Extras directory missing'))
      return
    }
    const zipFile = path.join(extrasDirectory, 'snap.zip')
    countEntries(zipFile).then((entriesNumber) => {
      const stream = fs.createReadStream(zipFile).pipe(unzip.Parse())
      resolve([stream, entriesNumber])
    })
  })
}

export { getRomsList, getSnaps }
