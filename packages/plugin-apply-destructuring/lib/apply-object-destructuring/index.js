'use strict';

module.exports.report = () => 'Object destructuring should be used';

module.exports.replace = () => ({
    'const __a = __b.__a': 'const {__a} = __b',
    'let __a = __b.__a': 'let {__a} = __b',
    
    'const __a = __b.__a || __c': 'const {__a = __c} = __b',
    'let __a = __b.__a || __c': 'let {__a = __c} = __b',
});

