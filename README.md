# loadsql

[![NPM Version](https://img.shields.io/npm/v/loadsql.svg?style=flat)](https://www.npmjs.com/package/loadsql)
[![David](https://img.shields.io/david/adriano-di-giovanni/loadsql.svg?maxAge=2592000)]()
[![David](https://img.shields.io/david/dev/adriano-di-giovanni/loadsql.svg?maxAge=2592000)]()
[![Build Status](https://travis-ci.org/adriano-di-giovanni/loadsql.svg?branch=master)](https://travis-ci.org/adriano-di-giovanni/loadsql)
[![codecov](https://codecov.io/gh/adriano-di-giovanni/loadsql/branch/master/graph/badge.svg)](https://codecov.io/gh/adriano-di-giovanni/loadsql)
[![Twitter Follow](https://img.shields.io/twitter/follow/codecreativity.svg?style=social&label=Follow&maxAge=2592000)]()

## Installation

```bash
npm install loadsql --save
```

## Usage

### Synchronous loading

```javascript
import SQLLoader from 'loadsql'

const loader = new SQLLoader()

const data = loader.loadSync('query')

console.log(data) // SELECT ?? FROM ?? WHERE ?? = ?
```

### Asynchronous loading using callbacks

```javascript
import SQLLoader from 'loadsql'

const loader = new SQLLoader()

loader.load('query', (error, data) => {
  if (error) {
    throw error
  }
  console.log(data) // SELECT ?? FROM ?? WHERE ?? = ?
})
```

### Asynchronous loading using promises

```bash
npm install bluebird --save
```

```javascript
import Promise from 'bluebird'
import SQLLoader from 'loadsql'

SQLLoader.Promise = Promise

const loader = new SQLLoader()

loader.load('query')
  .then(data => {
    console.log(data) // SELECT ?? FROM ?? WHERE ?? = ?
  })
```

### Custom base path and file extension

Examples above create instances of `SQLLoader` that
* will use the default `path.resolve()` base path.
* will use the default `.sql` file extension.

You can set your own base path and extension as follows:

```javascript
import path from 'path'
import SQLLoader from 'loadsql'

const basePath = path.resolve(__dirname, './sql')
const ext = '.tpl'
const loader = new SQLLoader(basePath, ext)
```

## License

The project is licensed under the MIT license.
