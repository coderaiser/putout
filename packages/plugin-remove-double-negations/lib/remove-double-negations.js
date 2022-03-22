'use strict';

module.exports.report = () => `Avoid using double negations in conditions`;

module.exports.replace = () => ({
    'if (!!__a) __b': 'if (__a) __b',
    '!!__a ? __b : __c': '__a ? __b : __c',
    '!!__a && __b': '__a && __b',
    '!!__a.includes(__b)': '__a.includes(__b)',
    'while(!!__a) __b': 'while(__a) __b',
    'do __a; while(!!__b)': 'do __a; while(__b)',
    'for (__a; !!__b; __c) __d': 'for (__a; __b; __c) __d',
});

