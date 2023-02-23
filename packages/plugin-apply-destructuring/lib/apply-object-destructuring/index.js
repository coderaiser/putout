'use strict';

module.exports.report = () => 'Use object destructuring';

module.exports.replace = () => ({
    'const __a = __b.__a': 'const {__a} = __b',
    'let __a = __b.__a': 'let {__a} = __b',
});

