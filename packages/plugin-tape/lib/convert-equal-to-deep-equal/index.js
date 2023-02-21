'use strict';

const {types} = require('putout');
const {
    isArrayExpression,
    isIdentifier,
    isObjectExpression,
} = types;

module.exports.report = () => `Use 't.deepEqual()' when comparing Objects an Arrays`;

module.exports.match = () => ({
    't.equal(__a, __b)': check,
    't.notEqual(__a, __b)': check,
});

module.exports.replace = () => ({
    't.equal(__a, __b)': 't.deepEqual(__a, __b)',
    't.notEqual(__a, __b)': 't.notDeepEqual(__a, __b)',
});

function check({__b}, path) {
    if (isObjectExpression(__b))
        return true;
    
    if (isArrayExpression(__b))
        return true;
    
    if (!isIdentifier(__b))
        return false;
    
    const __bDeclaration = path.scope.bindings[__b.name];
    
    if (!__bDeclaration)
        return false;
    
    const {id, init} = __bDeclaration.path.node;
    
    if (!isIdentifier(id, {name: 'expected'}))
        return false;
    
    return isObjectExpression(init) || isArrayExpression(init);
}

