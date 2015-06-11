# file-async

[![NPM](https://nodei.co/npm/file-async.png)](https://nodei.co/npm/file-async/)

Use async fs. No more blocking code.
fs-extra + bluebird promisify

## Install with [npm](https://www.npmjs.com/package/file-async)

```shell
$ npm install --save file-async
```

## Usage

```js
var fsAsync = require('file-async');

var TMP_FILE_PATH = '/tmp/file_content.js';
// touch
return fsAsync.createFile(TMP_FILE_PATH).then(function () {
  // get stat
  return fsAsync.stat(TMP_FILE_PATH);
})
.then(function(file_stat) {
  // check
  return h.expect(file_stat.isFile()).to.be.equal(true);
})
.then(function() {
  // remove tmp file
  return fsAsync.remove(TMP_FILE_PATH);
})
.then(function() {
  // exits?
  return fsAsync.exists(TMP_FILE_PATH);
})
.then(function(file_exists) {
  // check again
  return h.expect(file_exists).to.be.equal(false);
});
```

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
