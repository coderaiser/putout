'use strict';

const {types} = require('putout');

const {
    isAssignmentPattern,
    isIdentifier,
    isObjectPattern,
} = types;

module.exports.useParamsBeforeLastUsed = ({use, isUsed}) => ({path, params}) => {
    let i = params.length;
    
    while (--i > 0) {
        const param = params[i];
        
        if (traverseIsUsed(isUsed, path, param))
            break;
    }
    
    while (--i >= 0) {
        if (!isIdentifier(params[i]))
            continue;
        
        use(path, params[i].name);
    }
};

const traverseIsUsed = (isUsed, path, node) => {
    if (isIdentifier(node))
        return isUsed(path, node.name);
    
    if (isObjectPattern(node))
        return isUsedObjectPattern(isUsed, path, node);
    
    if (isAssignmentPattern(node))
        return isUsedAssignmentPattern(isUsed, path, node);
};

const isUsedAssignmentPattern = (isUsed, path, node) => {
    const {left} = node;
    
    if (isIdentifier(left))
        return isUsed(path, left.name);
};

const isUsedObjectPattern = (isUsed, path, node) => {
    for (const prop of node.properties) {
        const {value} = prop;
        
        if (isIdentifier(value)) {
            if (isUsed(path, value.name))
                return true;
            
            continue;
        }
    }
    
    return false;
};

