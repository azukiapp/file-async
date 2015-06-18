import h from './spec_helper';
import BB from 'bluebird';
import fsAsync from '../src/file-async';

describe('fsAsync:', function() {

  it("should keep support sync methods", function() {
    h.expect(fsAsync.existsSync(__filename)).to.ok;
  });

  it("should keep support callback methods", function(done) {
    fsAsync.readFileCallback(__filename, function(err, file_content) {
      h.expect(file_content.toString()).not.been.undefined;
      done();
    });
  });

  it('should read a file', function () {
    return fsAsync.readFile(__filename).then(function(file_content) {
      return h.expect(file_content.toString()).not.been.undefined;
    });
  });

  it('should get fsStat from file', function () {
    return fsAsync.stat(__filename).then(function(fsStat) {
      return h.expect(fsStat.isFile()).to.eql(true);
    });
  });

  it('should write a file', function () {
    var TMP_FILE_PATH = '/tmp/file_content.js';

    // readFile this file content
    return fsAsync.readFile(__filename).then(function (file_content) {
      // write file
      return fsAsync.writeFile(TMP_FILE_PATH, file_content.toString());
    })
    .then(function() {
      // get stat
      return fsAsync.stat(TMP_FILE_PATH);
    })
    .then(function(file_stat) {
      // check if tmp file exists
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
  });

  it('should createFile an empty file', function () {
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
  });

  it('should copy a folder to another', function () {
    var file_content;

    // read: get this content
    return fsAsync.readFile(__filename).then(function(content) {
      file_content = content.toString();
    })
    .then(function() {
      // mkdirs: create folders
      return fsAsync.mkdirs('/tmp/folder1/folder2/');
    })
    .then(function() {
      // stat: check if folders were created
      return BB.all([
        fsAsync.stat('/tmp/folder1').then(function(stat_result) {
          return h.expect(stat_result.isDirectory()).to.be.equal(true);
        }),
        fsAsync.stat('/tmp/folder1/folder2').then(function(stat_result) {
          return h.expect(stat_result.isDirectory()).to.be.equal(true);
        }),
      ]);
    })
    .then(function() {
      // write: write files
      return BB.all([
        fsAsync.writeFile('/tmp/folder1/some-file-1.js', file_content),
        fsAsync.writeFile('/tmp/folder1/folder2/some-file-2.js', file_content),
      ]);
    })
    .then(function() {
      // copy: copy file tree
      return fsAsync.copy('/tmp/folder1/', '/tmp/folder1-copy/');
    })
    .then(function() {
      // stat: check files stats
      return BB.all([
        fsAsync.stat('/tmp/folder1-copy/some-file-1.js').then(function(stat_result) {
          return h.expect(stat_result.isFile()).to.be.equal(true);
        }),
        fsAsync.stat('/tmp/folder1-copy/folder2/some-file-2.js').then(function(stat_result) {
          return h.expect(stat_result.isFile()).to.be.equal(true);
        }),
      ]);
    })
    .then(function() {
      return BB.all([
        fsAsync.remove('/tmp/folder1'),
        fsAsync.remove('/tmp/folder1-copy'),
      ]);
    })
    .then(function() {
      // stat: check files stats
      return BB.all([
        fsAsync.exists('/tmp/folder1').then(function(exists_result) {
          return h.expect(exists_result).to.be.equal(false);
        }),
        fsAsync.exists('/tmp/folder1-copy').then(function(exists_result) {
          return h.expect(exists_result).to.be.equal(false);
        }),
      ]);
    });
  });

  it('should create and check a symbolic link', function () {
    var file_content;
    // read: get this content
    return fsAsync.readFile(__filename).then(function(content) {
      file_content = content.toString();
    })
    .then(function() {
      // mkdirs: create folders
      return fsAsync.mkdirs('/tmp/folder1/folder2/');
    })
    .then(function() {
      // write: write files
      return fsAsync.writeFile('/tmp/folder1/some-file-1.js', file_content.toString());
    })
    .then(function() {
      // symlink: make symlink
      return fsAsync.symlink('/tmp/folder1/some-file-1.js', '/tmp/folder1/folder2/some-file-symlink-1.js', 'file');
    })
    .then(function() {
      // stat: check file stat
      return fsAsync.stat('/tmp/folder1/some-file-1.js').then(function(stat_result) {
        return h.expect(stat_result.isFile()).to.be.equal(true);
      });
    })
    .then(function() {
      // lstat: check symlink stat
      return fsAsync.lstat('/tmp/folder1/folder2/some-file-symlink-1.js').then(function(lstat_result) {
        return h.expect(lstat_result.isSymbolicLink()).to.be.equal(true);
      });
    })
    .then(function() {
      return fsAsync.remove('/tmp/folder1');
    })
    .then(function() {
      // stat: check files stats
      return fsAsync.exists('/tmp/folder1').then(function(exists_result) {
        return h.expect(exists_result).to.be.equal(false);
      });
    });
  });

});
