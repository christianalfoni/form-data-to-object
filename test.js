var lib = require('./index.js');

exports['should not convert plain text'] = function(test) {
    var input = {
      'foo': 'bar'
    };
    test.deepEqual(lib(input), {
      'foo': 'bar'
    });
    test.done();
};

exports['should convert brackets with text to nested objects'] = function(test) {
    var input = {
      'foo[bar]': 'bar'
    };
    test.deepEqual(lib(input), {
      'foo': {
        'bar': 'bar'
      }
    });
    test.done();
};

exports['should convert brackets with numbers to nested arrays'] = function(test) {
    var input = {
      'foo[0]': 'bar'
    };
    test.deepEqual(lib(input), {
      'foo': ['bar']
    });
    test.done();
};

exports['should convert complex structures to object and arrays respectively'] = function(test) {
    var input = {
      'foo[0]': 'bar',
      'foo[1]': 'bar2',
      'foo[2][foo]': 'bar',
      'foo[3][0][foo]': 'bar',

    };
    test.deepEqual(lib(input), {
      'foo': ['bar', 'bar2', {foo: 'bar'}, [{foo: 'bar'}]]
    });
    test.done();
};
