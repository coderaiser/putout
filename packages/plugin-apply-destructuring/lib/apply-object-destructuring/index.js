'use strict';

module.exports.report = () => 'Use object destructuring';

module.exports.exclude = () => [
    'const __a = __b.__a || __c.__d',
    'const __a = __b || __c(__object)',
    'let __a = __b.__a || __c.__d',
];

module.exports.replace = () => ({
    'const __a = __b.__a': 'const {__a} = __b',
    'let __a = __b.__a': 'let {__a} = __b',
});

