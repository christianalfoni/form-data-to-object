var lib = require('./index.js');
var fromObj = lib.fromObj;
var toObj = lib.toObj;

exports['toObj: should not convert plain text'] = function(test) {
    var input = {
      'foo': 'bar'
    };
    test.deepEqual(toObj(input), {
      'foo': 'bar'
    });
    test.done();
};

exports['toObj: should convert brackets with text to nested objects'] = function(test) {
    var input = {
      'foo[bar]': 'bar'
    };
    test.deepEqual(toObj(input), {
      'foo': {
        'bar': 'bar'
      }
    });
    test.done();
};

exports['toObj: should convert brackets with numbers to nested arrays'] = function(test) {
    var input = {
      'foo[0]': 'bar'
    };
    test.deepEqual(toObj(input), {
      'foo': ['bar']
    });
    test.done();
};

exports['toObj: should convert complex structures to object and arrays respectively'] = function(test) {
    var input = {
      'foo[0]': 'bar',
      'foo[1]': 'bar2',
      'foo[2][foo]': 'bar',
      'foo[3][0][foo]': 'bar',

    };
    test.deepEqual(toObj(input), {
      'foo': ['bar', 'bar2', {foo: 'bar'}, [{foo: 'bar'}]]
    });
    test.done();
};

exports['toObj: should not pollute the prototype through __proto__'] = function(test) {
    test.deepEqual(toObj({'__proto__[polluted]': 'yes'}), {});
    test.strictEqual(({}).polluted, undefined);
    test.done();
};

exports['toObj: should not pollute the prototype through constructor'] = function(test) {
    test.deepEqual(toObj({'constructor[prototype][polluted]': 'yes'}), {});
    test.strictEqual(({}).polluted, undefined);
    test.done();
};

exports['toObj: should not pollute the prototype through a nested __proto__'] = function(test) {
    test.deepEqual(toObj({'foo[__proto__][polluted]': 'yes'}), {});
    test.strictEqual(({}).polluted, undefined);
    test.done();
};

exports['toObj: should not walk into inherited properties'] = function(test) {
    test.deepEqual(toObj({'toString[polluted]': 'yes'}), {'toString': {'polluted': 'yes'}});
    test.strictEqual(Object.prototype.toString.polluted, undefined);
    test.done();
};

exports['toObj: should keep safe keys when an unsafe key is present'] = function(test) {
    test.deepEqual(toObj({'foo[bar]': 'bar', '__proto__[polluted]': 'yes'}), {
      'foo': {
        'bar': 'bar'
      }
    });
    test.strictEqual(({}).polluted, undefined);
    test.done();
};

exports['fromObj: transform of transform should be equal to original (aka fromObj(toObj(obj)) === obj)'] = function(test) {
    var input = {
      'foo[0]': 'bar',
      'foo[1]': 'bar2',
      'foo[2][foo]': 'bar',
      'foo[3][0][foo]': 'bar',

    };
    test.deepEqual(fromObj(toObj(input)), input);
    test.done();
};

exports['fromObj: should convert homogeneous arrays'] = function(test) {
    var input = {
      'foo': ['bar', 'bar2'],
    };
    test.deepEqual(fromObj(input), {
      'foo[0]': 'bar',
      'foo[1]': 'bar2',
    });
    test.done();
};

exports['fromObj: should convert heterogeneous arrays'] = function(test) {
    var input = {
      'foo': ['bar', 1, ['bar2', 'bar3']],
    };
    test.deepEqual(fromObj(input), {
      'foo[0]': 'bar',
      'foo[1]': 1,
      'foo[2][0]': 'bar2',
      'foo[2][1]': 'bar3',
    });
    test.done();
};

exports['fromObj: should convert nested objects'] = function(test) {
    var input = {
      'foo': {
        'foo2': 'bar1',
        'foo3': {
          'foo4': 'bar2',
          'foo5': ['bar3'],
        }
      },
    };
    test.deepEqual(fromObj(input), {
      'foo[foo2]': 'bar1',
      'foo[foo3][foo4]': 'bar2',
      'foo[foo3][foo5][0]': 'bar3',
    });
    test.done();
};
