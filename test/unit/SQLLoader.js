import path from 'path'
import fs from 'fs'
import Promise from 'bluebird'
import SQLLoader from '../../src'

describe('SQLLoader', () => {
  it('should default to cwd', () => {
    const loader = new SQLLoader()
    expect(loader.basePath).to.equal(path.resolve())
  })

  it('should set a `basePath`', () => {
    const basePath = path.resolve(__dirname, '../sql')
    const loader = new SQLLoader(basePath)
    expect(loader.basePath).to.equal(basePath)
  })

  it('should default to `.sql` ext', () => {
    const loader = new SQLLoader()
    expect(loader.ext).to.equal('.sql')
  })

  it('should set an `ext`', () => {
    const loader = new SQLLoader('', '.tpl')
    expect(loader.ext).to.equal('.tpl')
  })

  it('_normalizePath', () => {
    let loader = new SQLLoader()
    expect(loader._normalizePath('script')).to.equal('script.sql')
    expect(loader._normalizePath('script.sql')).to.equal('script.sql')
    loader = new SQLLoader('', '.tpl')
    expect(loader._normalizePath('script')).to.equal('script.tpl')
    expect(loader._normalizePath('script.tpl')).to.equal('script.tpl')
    expect(loader._normalizePath('script.sql')).to.equal('script.sql.tpl')
  })

  it('_getFullPath', () => {
    let loader = new SQLLoader()
    expect(loader._getFullPath('script')).to.equal(path.resolve('script.sql'))
  })

  it('loadSync', () => {
    const basePath = path.resolve(__dirname, '../sql')
    const loader = new SQLLoader(basePath)
    const content = fs.readFileSync(path.resolve(basePath, './query.sql'), 'utf8')
    expect(loader.loadSync('query')).to.equal(content)
  })

  context('load', () => {
    const basePath = path.resolve(__dirname, '../sql')
    const loader = new SQLLoader(basePath)
    const content = fs.readFileSync(path.resolve(basePath, './query.sql'), 'utf8')

    it('should throw', () => {
      expect(() => {
        loader.load('query')
      }).to.throw(TypeError)
    })

    it('should invoke callback', (done) => {
      const callback = (error, data) => {
        expect(error).to.be.not.defined
        expect(data).to.equal(content)
        done()
      }
      loader.load('query', callback)
    })

    it('should return a promise', () => {
      SQLLoader.Promise = Promise
      return loader.load('query')
        .then(data => {
          expect(data).to.equal(content)
        })
    })
  })
})
