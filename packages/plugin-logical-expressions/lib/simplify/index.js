'use strict';

const {operator} = require('putout');
const {isSimple} = operator;

module.exports.report = () => 'Simplify logical expression';

module.exports.match = () => ({
    '__a(__args) && __b': ({__b}, path) => {
        if (!path.parentPath.isExpressionStatement())
            return false;
        
        return isSimple(__b);
    },
});

module.exports.replace = () => ({
    '__a(__args) && __b': '__a(__args)',
    
    '!(__a && !__b)': '!__a || __b',
    '!(!__a && __b)': '__a || !__b',
    '!(__a !== __b)': '__a === __b',
    '!__a === "__b"': '__a !== "__b"',
    
    '!__a instanceof __b': '!(__a instanceof __b)',
    '__a instanceof !__b': '!(__a instanceof __b)',
    '!__a instanceof !__b': '!(__a instanceof __b)',
    
    '!__a in __b': '!(__a in __b)',
    '__a in !__b': '!(__a in __b)',
    '!__a in !__b': '!(__a in __b)',
    
    '__a === __a': 'true',
    '__a == __a': 'true',
    '__a !== __a': 'false',
    '__a != __a': 'false',
    
    '__a === []': 'false',
    '__a == []': 'false',
    
    '__a === {}': 'false',
    '__a == {}': 'false',
    
    '__a && __b || __a && __c': '__a && (__b || __c)',
    '__a && __b && __a && __c': '__a && __b && __c',
    '__a || __b && __a || __c': '__a || __b || __c',
});
