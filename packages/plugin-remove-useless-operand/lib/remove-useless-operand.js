'use strict';

const {types} = require('putout');

const {
    isNumericLiteral,
    isIdentifier,
} = types;

module.exports.report = () => 'Avoid useless operand';

module.exports.match = () => ({
    '__a = __b + __a': check,
});

module.exports.replace = () => ({
    '__a += 1': '++__a',
    '__a -= 1': '--__a',
    
    '__a = __a + __b': '__a += __b',
    '__a = __a - __b': '__a -= __b',
    '__a = __a * __b': '__a *= __b',
    '__a = __a / __b': '__a /= __b',
    '__a = __a & __b': '__a &= __b',
    '__a = __a | __b': '__a |= __b',
    '__a = __a ^ __b': '__a ^= __b',
    '__a = __a ** __b': '__a **= __b',
    
    '__a = __b + __a': '__a += __b',
    '__a = __b * __a': '__a *= __b',
    '__a = __b & __a': '__a &= __b',
    '__a = __b | __a': '__a |= __b',
    '__a = __b ^ __a': '__a ^= __b',
});

function check({__b}, path) {
    if (isNumericLiteral(__b))
        return true;
    
    if (!isIdentifier(__b))
        return false;
    
    const binding = path.scope.bindings[__b.name];
    
    if (!binding)
        return false;
    
    if (!binding.path.isVariableDeclarator())
        return false;
    
    return isNumericLiteral(binding.path.node.init);
}

