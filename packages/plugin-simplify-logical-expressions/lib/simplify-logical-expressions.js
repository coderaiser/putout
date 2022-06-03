'use strict';

module.exports.report = () => 'Simplify logical expression';

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
    
    '__a && __b || __a && __c': '__a && (__b || __c)',
    '__a && __b && __a && __c': '__a && __b && __c',
    '__a || __b && __a || __c': '__a || __b || __c',
});

