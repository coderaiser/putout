'use strict';

const {operator, types} = require('putout');
const {
    unaryExpression,
    isUnaryExpression,
    returnStatement,
} = types;

const {
    compareAny,
    replaceWith,
    remove,
} = operator;

module.exports.report = () => `Simplify boolean return`;

module.exports.match = () => ({
    'if (__a) return __bool__a;': checkNext,
});

module.exports.replace = () => ({
    'if (__a) return __bool__a;'({__a, __bool__a}, path) {
        const next = path.getNextSibling();
        
        remove(next);
        
        if (__bool__a.value)
            return 'return __a';
        
        if (isUnaryExpression(__a, {operator: '!'})) {
            const {argument} = __a;
            return returnStatement(argument);
        }
        
        const unary = unaryExpression('!', __a);
        replaceWith(path.get('test'), unary);
        
        return 'return !(__a)';
    },
});

function checkNext(vars, path) {
    const next = path.getNextSibling();
    return compareAny(next, ['return true', 'return false']);
}
