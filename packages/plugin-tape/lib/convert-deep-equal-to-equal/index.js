'use strict';

const {types, operator} = require('putout');

const isNull = (a) => !a && typeof a === 'object';
const isUndefined = (a) => typeof a === 'undefined';
const isBool = (a) => typeof a === 'boolean';
const isNumber = (a) => typeof a === 'number';
const isString = (a) => typeof a === 'string';
const isPrimitive = (a) => isString(a) || isNumber(a) || isBool(a) || isNull(a) || isUndefined(a);
const {compute} = operator;

const {
    isLiteral,
    isRegExpLiteral,
    isIdentifier,
} = types;

module.exports.report = (path) => {
    const args = path.get('arguments');
    
    if (args.length === 2)
        return `Use 't.equal(${args[0]}, ${args[1]})' instead of '${path}' when comparing with primitive`;
    
    return `Use 't.equal(${args[0]}, ${args[1]}, ${args[2]})' instead of '${path} when comparin with primitive'`;
};

const check = ({__b}, path) => {
    if (isRegExpLiteral(__b))
        return false;
    
    if (isLiteral(__b))
        return true;
    
    if (isIdentifier(__b, {name: 'undefined'}))
        return true;
    
    const expectedPath = path.get('arguments.1');
    
    if (checkExpected(expectedPath))
        return true;
    
    const [is, value] = compute(expectedPath);
    
    return is && isPrimitive(value);
};

module.exports.match = () => ({
    't.deepEqual(__a, __b)': check,
    't.deepEqual(__a, __b, __c)': check,
});

module.exports.replace = () => ({
    't.deepEqual(__a, __b)': 't.equal(__a, __b)',
    't.deepEqual(__a, __b, __c)': 't.equal(__a, __b, __c)',
});

function checkExpected(path) {
    if (!path.isIdentifier())
        return false;
    
    const {name} = path.node;
    const binding = path.scope.bindings[name];
    
    if (!binding)
        return false;
    
    if (!binding.path.isVariableDeclarator())
        return false;
    
    const initPath = binding.path.get('init');
    
    return initPath.isTaggedTemplateExpression();
}
