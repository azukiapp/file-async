# file-async

[![NPM](https://nodei.co/npm/file-async.png)](https://nodei.co/npm/file-async/)

[![Build Status](https://travis-ci.org/azukiapp/file-async.svg?branch=master)](https://travis-ci.org/azukiapp/file-async)

- All functions from [fs](https://nodejs.org/api/fs.html) and [fs-extra](https://github.com/jprichardson/node-fs-extra) to use with Promises
- No more blocking code.
- _bluebird's promisified_
- _exists()_ is fixed

## Install with [npm](https://www.npmjs.com/package/file-async)

```shell
$ npm install --save file-async
```

## Usage

```js
var fsAsync = require('file-async');

var TMP_FILE_PATH = '/tmp/file_content.js';
// "touch" a new empty file
return fsAsync.createFile(TMP_FILE_PATH).then(function () {
  // get stats
  return fsAsync.stat(TMP_FILE_PATH);
})
.then(function(file_stat) {
  // check is it is a file
  console.log(TMP_FILE_PATH, 'is a file?', file_stat.isFile());
})
.then(function() {
  // remove tmp file
  return fsAsync.remove(TMP_FILE_PATH);
})
.then(function() {
  // exists?
  return fsAsync.exists(TMP_FILE_PATH);
})
.then(function(file_exists) {
  // check again
  console.log(TMP_FILE_PATH, 'is a file?', file_exists);
});
```

## Functions

### async functions (Promises)

- access
- appendFile
- chmod
- chown
- close
- copy
- createFile
- createOutputStream
- createReadStream
- createWriteStream
- delete
- emptyDir
- emptydir
- ensureDir
- ensureFile
- exists
- fchmod
- fchown
- fdatasync
- FileReadStream
- FileWriteStream
- fstat
- fsync
- ftruncate
- futimes
- lchmod
- lchown
- link
- lstat
- lutimes
- mkdir
- mkdirp
- mkdirs
- move
- open
- outputFile
- outputJson
- outputJSON
- read
- readdir
- readFile
- readJson
- readJSON
- readJsonFile
- readJSONFile
- readlink
- ReadStream
- realpath
- remove
- rename
- rmdir
- stat
- Stats
- symlink
- truncate
- unlink
- unwatchFile
- utimes
- watch
- watchFile
- write
- writeFile
- writeJson
- writeJSON
- writeJsonFile
- writeJSONFile
- WriteStream

-----------

#### callback node.js old callback way (do use this)

> accessCallback, appendFileCallback, chmodCallback, chownCallback, closeCallback, copyCallback, createFileCallback, createOutputStreamCallback, createReadStreamCallback, createWriteStreamCallback, deleteCallback, emptyDirCallback, emptydirCallback, ensureDirCallback, ensureFileCallback, existsCallback, fchmodCallback, fchownCallback, fdatasyncCallback, FileReadStreamCallback, FileWriteStreamCallback, fstatCallback, fsyncCallback, ftruncateCallback, futimesCallback, lchmodCallback, lchownCallback, linkCallback, lstatCallback, lutimesCallback, mkdirCallback, mkdirpCallback, mkdirsCallback, moveCallback, openCallback, outputFileCallback, outputJsonCallback, outputJSONCallback, readCallback, readdirCallback, readFileCallback, readJsonCallback, readJSONCallback, readJsonFileCallback, readJSONFileCallback, readlinkCallback, ReadStreamCallback, realpathCallback, removeCallback, renameCallback, rmdirCallback, statCallback, StatsCallback, symlinkCallback, truncateCallback, unlinkCallback, unwatchFileCallback, utimesCallback, watchCallback, watchFileCallback, writeCallback, writeFileCallback, writeJsonCallback, writeJSONCallback, writeJsonFileCallback, writeJSONFileCallback, WriteStreamCallback

-----------

#### sync functions (blocking code - do use this)

> accessSync, existsSync, readFileSync, closeSync, openSync, readSync, writeSync, renameSync, truncateSync, ftruncateSync, rmdirSync, fdatasyncSync, fsyncSync, mkdirSync, readdirSync, fstatSync, lstatSync, statSync, readlinkSync, symlinkSync, linkSync, unlinkSync, fchmodSync, chmodSync, fchownSync, chownSync, utimesSync, futimesSync, writeFileSync, appendFileSync, realpathSync, lutimesSync, lchownSync, lchmodSync, copySync, removeSync, deleteSync, mkdirsSync, mkdirpSync, createFileSync, ensureFileSync, ensureDirSync, outputFileSync, readJsonFileSync, readJSONFileSync, readJsonSync, readJSONSync, outputJsonSync, outputJSONSync, writeJsonFileSync, writeJSONFileSync, writeJsonSync, writeJSONSync, emptyDirSync, emptydirSync

-----------


## CONTRIBUTING

- Install/Update dependencies:

    ```shell
    $ npm install --save-dev azk-dev
    $ gulp editor:config
    $ gulp babel:runtime:install
    $ npm install
    ```

- Commit

    ```shell
    $ git add .
    $ git commit -m 'Updated azk-dev.'
    ```

## azk-dev

Show all gulp tasks:

```shell
$ gulp help
```

#### Tests

```shell
# default (lint + test, no watch)
$ gulp lint test

# test + lint + watch
$ gulp watch:lint:test

# test + watch (no-lint)
$ gulp watch:test
```


#### Deploy npm package

You can deploy package with:

```shell
$ npm run deploy [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease]
```

This should run the following steps:

  - Check if not tracked commits in git
  - Run tests with `npm test`
  - Upgrade version in `package.json`, commit and add tag
  - Publish package in npmjs.com
