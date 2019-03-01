'use strict';

const {types} = require('putout');

const {
    isAssignmentPattern,
    isIdentifier,
    isObjectPattern,
    isRestElement,
} = types;

module.exports.usePropertiesBeforeRest = ({use}) => ({path, params}) => {
    for (const param of params) {
        if (!isObjectPattern(param))
            continue;
        
        traverseProperties(use, path, param.properties);
    }
};

function traverseProperties(use, path, properties) {
    const {length} = properties;
    const last = properties[length - 1];
    
    if (!isRestElement(last))
        return;
    
    for (let i = 0; i < length - 1; i++) {
        const prop = properties[i];
        const {value} = prop;
        
        if (isIdentifier(value))
            use(path, value.name);
    }
}

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
    
    return {
        path,
        params,
    };
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

