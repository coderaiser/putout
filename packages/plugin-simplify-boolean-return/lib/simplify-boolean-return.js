'use strict';

const {
    operator,
    types,
} = require('putout');

const {
    compareAny,
    replaceWith,
} = operator;

const {UnaryExpression} = types;

module.exports.report = () => `Simplify boolean return`;

module.exports.match = () => ({
    'if (__a) return __bool__a;': checkNext,
});

module.exports.replace = () => ({
    'if (__a) return __bool__a;'({__a, __bool__a}, path) {
        const next = path.getNextSibling();
        
        next.remove();
        
        if (__bool__a.value)
            return 'return __a';
        
        const unary = UnaryExpression('!', __a);
        replaceWith(path.get('test'), unary);
        
        return 'return !(__a)';
    },
});

function checkNext(vars, path) {
    const next = path.getNextSibling();
    
    return compareAny(next, ['return true', 'return false']);
}
