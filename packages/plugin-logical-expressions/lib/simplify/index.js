'use strict';

const {operator} = require('putout');
const {isSimple, replaceWith} = operator;

module.exports.report = () => 'Simplify logical expression';

module.exports.match = () => ({
    '__a(__args) && __b': ({__a, __b}, path) => {
        if (path.parentPath.isJSXExpressionContainer())
            return false;
        
        if (__a.name === 'Boolean')
            return true;
        
        if (!path.parentPath.isExpressionStatement())
            return false;
        
        return isSimple(__b);
    },
});

module.exports.replace = () => ({
    'Boolean(__a) || __b': '__a || __b',
    '__a(__args) && __b': ({__a}, path) => {
        if (__a.name === 'Boolean') {
            const leftPath = path.get('left');
            const [node] = leftPath.node.arguments;
            
            replaceWith(leftPath, node);
            
            return path;
        }
        
        return '__a(__args)';
    },
    '!(__a && !__b)': '!__a || __b',
    '!(!__a && __b)': '__a || !__b',
    '!(__a !== __b)': '__a === __b',
    '!(__a === __b)': '__a !== __b',
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
