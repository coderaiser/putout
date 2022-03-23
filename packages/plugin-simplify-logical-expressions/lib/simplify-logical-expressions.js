'use strict';

module.exports.report = () => 'Logical expression should be simplified';

module.exports.replace = () => ({
    '!(__a && !__b)': '!__a || __b',
    '!(!__a && __b)': '__a || !__b',
    '!__a === "__b"': '__a !== "__b"',
    
    '!__a instanceof __b': '!(__a instanceof __b)',
    '__a instanceof !__b': '!(__a instanceof __b)',
    '!__a instanceof !__b': '!(__a instanceof __b)',
    
    '!__a in __b': '!(__a in __b)',
    '__a in !__b': '!(__a in __b)',
    '!__a in !__b': '!(__a in __b)',
});

