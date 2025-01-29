'use strict';

const {operator, types} = require('putout');

const {
    compareAny,
    replaceWith,
    remove,
} = operator;

const {
    UnaryExpression,
    isUnaryExpression,
    ReturnStatement,
} = types;

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
            return ReturnStatement(argument);
        }
        
        const unary = UnaryExpression('!', __a);
        replaceWith(path.get('test'), unary);
        
        return 'return !(__a)';
    },
});

function checkNext(vars, path) {
    const next = path.getNextSibling();
    return compareAny(next, ['return true', 'return false']);
}
