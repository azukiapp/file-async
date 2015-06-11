var fsAsync = require('../index');

var TMP_FILE_PATH = '/tmp/file_content.js';
// touch
return fsAsync.createFile(TMP_FILE_PATH).then(function () {
  // get stat
  return fsAsync.stat(TMP_FILE_PATH);
})
.then(function(file_stat) {
  // check
  console.log(TMP_FILE_PATH, 'is a file?', file_stat.isFile());
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
  console.log(TMP_FILE_PATH, 'is a file?', file_exists);
});
