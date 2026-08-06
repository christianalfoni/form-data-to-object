var UNSAFE_KEYS = ['__proto__', 'constructor', 'prototype'];

function isUnsafeKey(key) {
  return UNSAFE_KEYS.indexOf(key) !== -1;
}

function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function toObj(source) {
  return Object.keys(source).reduce(function (output, key) {
    var parentKey = key.match(/[^\[]*/i);
    var paths = key.match(/\[.*?\]/g) || [];
    paths = [parentKey[0]].concat(paths).map(function (key) {
      return key.replace(/\[|\]/g, '');
    });

    // Keys pointing at the prototype chain are dropped, so that hostile input
    // cannot reach Object.prototype through this function.
    if (paths.some(isUnsafeKey)) {
      return output;
    }

    var currentPath = output;
    while (paths.length) {
      var pathKey = paths.shift();

      if (hasOwn(currentPath, pathKey)) {
        currentPath = currentPath[pathKey];
      } else {
        currentPath[pathKey] = paths.length ? isNaN(paths[0]) ? {} : [] : source[key];
        currentPath = currentPath[pathKey];
      }
    }

    return output;
  }, {});
}

function fromObj(obj) {
  function recur(newObj, propName, currVal) {
    if (Array.isArray(currVal) || Object.prototype.toString.call(currVal) === '[object Object]') {
      Object.keys(currVal).forEach(function(v) {
        recur(newObj, propName + "[" + v + "]", currVal[v]);
      });
      return newObj;
    }

    newObj[propName] = currVal;
    return newObj;
  }

  var keys = Object.keys(obj);
  return keys.reduce(function(newObj, propName) {
    return recur(newObj, propName, obj[propName]);
  }, {});
}

module.exports = {
  fromObj: fromObj,
  toObj: toObj
}