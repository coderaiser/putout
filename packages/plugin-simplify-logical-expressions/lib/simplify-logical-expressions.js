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
    
    '__a || __a': '__a',
    '__a && __a': '__a',
    '__a = __a': '__a',
    
    '__a === __a': 'true',
    '__a == __a': 'true',
    '__a !== __a': 'false',
    '__a != __a': 'false',
});

