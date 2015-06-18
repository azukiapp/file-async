import BB from 'bluebird';
var extra = require('fs-extra');

var final = {
  existsCallback: extra.exists.bind(extra),
  exists: function (full_path) {
    return new BB.Promise((resolve) => {
      this.existsCallback(full_path, resolve);
    });
  },
};

var async_methods = [];
var async_object  = BB.promisifyAll(extra, {
  // Skip .*Sync methods
  filter: (name, func, target, passesDefaultFilter) => {
    if (passesDefaultFilter && target === extra && !final[name]) {
      if (name.match(/Sync$/)) {
        final[name] = extra[name].bind(extra);
      } else {
        async_methods.push(name);
        return true;
      }
    }
    return false;
  },
});

// Rename .*Async methods
async_methods.forEach((method) => {
  final[method + "Callback"] = extra[method];
  final[method] = async_object[method + "Async"].bind(async_object);
});

module.exports = final;
