'use strict';

module.exports.report = () => `Useless type convertion should be avoided`;

module.exports.replace = () => ({
    'Boolean(__a.includes(__b))': '__a.includes(__b)',
    'String(typeof __a)': 'typeof __a',
    'if (Boolean(__a)) __b': 'if (__a) __b',
    'while (Boolean(__a)) __b': 'while (__a) __b',
    'do __b; while (Boolean(__a))': 'do __b; while (__a)',
    'for (__a; Boolean(__b); __c) __d': 'for (__a; __b; __c) __d',
    'for (__a; Boolean(__b);) __d': 'for (__a; __b;) __d',
    'for (; Boolean(__b);__c) __d': 'for (; __b; __c) __d',
    'for (; Boolean(__b);) __d': 'for (; __b;) __d',
});

