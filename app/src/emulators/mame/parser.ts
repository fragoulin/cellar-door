import path from 'path'
import fs from 'fs'
import readline from 'readline'
import { isNumber } from 'lodash'
import { MameIni } from './types'

// This file is only valid on main process

/**
 * Cache for mame.ini content.
 */
let mameIni: MameIni | undefined

/**
 * Process mame.ini file line by line and build result.
 *
 * @param filePath - path of mame.ini file.
 * @returns promise with content of mame.ini file.
 */
async function processLineByLine(filePath: string): Promise<MameIni> {
  if (mameIni) return mameIni

  mameIni = new Map()
  const fileStream = fs.createReadStream(filePath)

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  // Regex to match property name and property value on one line
  const regex = /([a-z0-9_]+)[ ]+(.+)/i

  for await (const line of rl) {
    if (line.charAt(0) !== '#' && line !== '') {
      const results = regex.exec(line)
      if (results) {
        const key = results[1]
        const value = isNumber(results[2]) ? parseInt(results[2]) : results[2]
        mameIni.set(key, value)
      }
    }
  }

  return mameIni
}

/**
 * Parse mame.ini file.
 *
 * @param mameDirectory - mame directory containing mame.ini file.
 * @returns promise with content of mame.ini file.
 */
function parseIni(mameDirectory: string): Promise<MameIni> {
  const filePath = path.join(mameDirectory, 'mame.ini')
  return processLineByLine(filePath)
}

/**
 * Try to retrieve a property from mame.ini file.
 *
 * @param mameDirectory - directory containing mame.ini file.
 * @param propertyKey - key of property to retrieve.
 * @returns a promise containing the value of the property retrieve.
 */
function getPropertyFromMameIni(
  mameDirectory: string,
  propertyKey: string
): Promise<string | number> {
  return new Promise((resolve, reject) => {
    parseIni(mameDirectory).then((mameIni) => {
      mameIni.forEach((value, key) => {
        if (key === propertyKey) {
          resolve(value)
        }
      })
      reject(new Error(`no property found for key ${propertyKey}`))
    })
  })
}

export { parseIni, getPropertyFromMameIni }
