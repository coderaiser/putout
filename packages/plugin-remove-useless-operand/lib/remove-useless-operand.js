import {types} from 'putout';

const {
    isNumericLiteral,
    isIdentifier,
} = types;

export const report = () => 'Avoid useless operand';

export const match = () => ({
    '__a = __b + __a': check,
});

export const replace = () => ({
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
