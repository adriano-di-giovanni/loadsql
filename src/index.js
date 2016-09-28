import path from 'path'
import fs from 'fs'

export default class SQLLoader {
  constructor (basePath = './', ext = '.sql') {
    this.basePath = path.resolve(basePath)
    this.ext = ext
  }

  load (filepath, callback) {
    const fullpath = this._getFullPath(filepath)
    if (callback) {
      return fs.readFile(fullpath, 'utf8', callback)
    }
    return new SQLLoader.Promise((resolve, reject) => {
      return fs.readFile(fullpath, 'utf8', (error, data) => {
        error ? reject(error) : resolve(data)
      })
    })
  }

  loadSync (filepath) {
    const fullpath = this._getFullPath(filepath)
    return fs.readFileSync(fullpath, 'utf8')
  }

  _normalizePath (filepath) {
    const { ext } = this
    return path.basename(filepath, ext) + ext
  }

  _getFullPath (filepath) {
    return path.resolve(this.basePath, this._normalizePath(filepath))
  }
}
