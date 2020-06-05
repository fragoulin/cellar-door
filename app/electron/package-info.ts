import { join } from 'path'
import { readFileSync } from 'fs'
import { rootPath } from 'electron-root-path'

// This file is only valid for the main process

export interface PackageInfo {
  name: string
  productName: string
  version: string
  description: string
  repository: string[]
  author: string
  homepage: string
  bugs: string[]
  keywords: string[]
  license: string
}

declare const PKG_INFO: PackageInfo

let _pkginfo: PackageInfo
if (typeof PKG_INFO !== 'undefined' && PKG_INFO !== null) {
  _pkginfo = PKG_INFO
} else {
  /* This is a fallback incase the webpack DefinePlugin modules hasn't been initialized yet. */
  /* Developement mode only */
  _pkginfo = JSON.parse(
    readFileSync(join(rootPath, 'package.json'), { encoding: 'utf8' })
  )
}

export const pkginfo = _pkginfo
