module.exports = function (source) {


  // "foo[0]"
  return Object.keys(source).reduce(function (output, key) {

    var parentKey = key.match(/[^\[]*/i);
    var paths = key.match(/\[.*?\]/g) || [];
    paths = [parentKey[0]].concat(paths).map(function (key) {
      return key.replace(/\[|\]/g, '');
    });

    var currentPath = output;
    while (paths.length) {

      var pathKey = paths.shift();

      if (pathKey in currentPath) {
        currentPath = currentPath[pathKey];
      } else {
        currentPath[pathKey] = paths.length ? isNaN(paths[0]) ? {} : [] : source[key];
        currentPath = currentPath[pathKey];
      }

    }

    return output;

  }, {});

};
