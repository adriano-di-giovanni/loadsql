import path from 'path'
import fs from 'fs'

export default class SQLLoader {
  constructor (basePath = './', ext = '.sql') {
    this.basePath = path.resolve(basePath)
    this.ext = ext
    this.cache = {}
  }

  load (filepath, callback) {
    const { cache } = this
    const fullpath = this._getFullPath(filepath)
    if (callback) {
      if (cache[fullpath]) {
        callback(null, cache[fullpath])
        return void 0
      }
      return fs.readFile(fullpath, 'utf8', (error, data) => {
        if (error) {
          callback(error)
          return void 0
        }
        cache[fullpath] = data
        callback(null, data)
      })
    }
    return new SQLLoader.Promise((resolve, reject) => {
      if (cache[fullpath]) {
        return resolve(cache[fullpath])
      }
      return fs.readFile(fullpath, 'utf8', (error, data) => {
        if (error) {
          reject(error)
          return void 0
        }
        cache[fullpath] = data
        resolve(data)
      })
    })
  }

  loadSync (filepath) {
    const { cache } = this
    const fullpath = this._getFullPath(filepath)
    if (!cache[fullpath]) {
      cache[fullpath] = fs.readFileSync(fullpath, 'utf8')
    }
    return cache[fullpath]
  }

  _normalizePath (filepath) {
    const { ext } = this
    return path.basename(filepath, ext) + ext
  }

  _getFullPath (filepath) {
    return path.resolve(this.basePath, this._normalizePath(filepath))
  }
}
