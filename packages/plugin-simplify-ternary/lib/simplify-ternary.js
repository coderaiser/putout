'use strict';

module.exports.report = () => 'Ternary should be simplified';

module.exports.replace = () => ({
    '__a ? __a : __b': '__a || __b',
    '__a ? __b : __a': '__a && __b',
    '__a ? __b : __b ': '__b',
    '__a ? false : true': '!__a',
    '__a = __b ? __a : __d': 'if (!__b) __a = __d',
    '__a = __b ? __d : __a': 'if (__b) __a = __d',
});

