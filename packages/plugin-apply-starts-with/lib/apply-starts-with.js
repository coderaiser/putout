'use strict';

const {operator, types} = require('putout');
const {
    isStringLiteral,
    isObjectPattern,
    isAssignmentPattern,
} = types;

const {compare} = operator;

module.exports.report = () => `Use '.startsWith()' instead of '.indexOf()'`;

module.exports.match = () => ({
    '!__a.indexOf(__b)': checkIndex,
});

module.exports.replace = () => ({
    '!__a.indexOf(__b)': '__a.startsWith(__b)',
});

function checkIndex({__a}, path) {
    const {name} = __a;
    const binding = path.scope.getAllBindings()[name];
    
    if (!binding)
        return false;
    
    const bindingNode = binding.path.node;
    
    if (isAssignmentPattern(bindingNode))
        return checkAssign(__a, bindingNode);
    
    if (isObjectPattern(bindingNode))
        return checkObject(__a, bindingNode);
    
    if (isObjectPattern(bindingNode.id))
        return checkObject(__a, bindingNode.id);
    
    return false;
}

function checkAssign(node, assign) {
    const {left, right} = assign;
    
    if (!compare(node, left))
        return false;
    
    return isStringLiteral(right);
}

function checkObject(node, object) {
    for (const prop of object.properties) {
        if (!isAssignmentPattern(prop.value))
            continue;
        
        return checkAssign(node, prop.value);
    }
    
    return false;
}
