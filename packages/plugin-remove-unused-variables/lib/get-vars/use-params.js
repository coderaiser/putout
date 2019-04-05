'use strict';

const {types} = require('putout');

const {
    isAssignmentPattern,
    isIdentifier,
    isObjectPattern,
    isRestElement,
} = types;

module.exports.usePropertiesBeforeRest = ({use}) => ({chunk, params}) => {
    for (const param of params) {
        if (!isObjectPattern(param))
            continue;
        
        traverseProperties(use, chunk, param.properties);
    }
};

function traverseProperties(use, chunk, properties) {
    const {length} = properties;
    const last = properties[length - 1];
    
    if (!isRestElement(last))
        return;
    
    for (let i = 0; i < length - 1; i++) {
        const prop = properties[i];
        const {value} = prop;
        
        if (isIdentifier(value))
            use(chunk, value.name);
    }
}

module.exports.useParamsBeforeLastUsed = ({use, isUsed}) => ({chunk, params}) => {
    let i = params.length;
    
    while (--i > 0) {
        const param = params[i];
        
        if (traverseIsUsed(isUsed, chunk, param))
            break;
    }
    
    while (--i >= 0) {
        if (!isIdentifier(params[i]))
            continue;
        
        use(chunk, params[i].name);
    }
    
    return {
        chunk,
        params,
    };
};

const traverseIsUsed = (isUsed, chunk, node) => {
    if (isIdentifier(node))
        return isUsed(chunk, node.name);
    
    if (isObjectPattern(node))
        return isUsedObjectPattern(isUsed, chunk, node);
    
    if (isAssignmentPattern(node))
        return isUsedAssignmentPattern(isUsed, chunk, node);
};

const isUsedAssignmentPattern = (isUsed, chunk, node) => {
    const {left} = node;
    
    if (isIdentifier(left))
        return isUsed(chunk, left.name);
};

const isUsedObjectPattern = (isUsed, chunk, node) => {
    for (const prop of node.properties) {
        const {value} = prop;
        
        if (isIdentifier(value)) {
            if (isUsed(chunk, value.name))
                return true;
            
            continue;
        }
    }
    
    return false;
};

