'use strict';

const {types} = require('putout');
const {
    isIdentifier,
    isObjectPattern,
    isRestElement,
    isAssignmentPattern,
} = types;

module.exports.usePropertiesBeforeRest = ({use}) => ({path, params}) => {
    for (const param of params) {
        if (!isObjectPattern(param))
            continue;
        
        traverseProperties(use, path, param.properties);
    }
    
    return {
        path,
        params,
    };
};

module.exports.useParamsBeforeAssign = ({use}) => ({path, params}) => {
    const last = params.at(-1);
    const usedParams = params.slice(0, -1);
    
    if (!isAssignmentPattern(last))
        return;
    
    for (const param of usedParams) {
        if (isIdentifier(param))
            use(path, param.name);
    }
    
    return {
        path,
        params,
    };
};

function traverseProperties(use, path, properties) {
    const {length} = properties;
    const last = properties.at(-1);
    
    if (!isRestElement(last))
        return;
    
    for (let i = 0; i < length - 1; i++) {
        const {value} = properties[i];
        const {type} = value;
        
        switch(type) {
        case 'Identifier':
            use(path, value.name);
            continue;
        }
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
    const {type} = node;
    
    switch(type) {
    case 'Identifier':
        return isUsed(path, node.name);
    
    case 'ObjectPattern':
        return isUsedObjectPattern(isUsed, path, node);
    
    case 'AssignmentPattern':
        return isUsedAssignmentPattern(isUsed, path, node);
    }
};

const isUsedAssignmentPattern = (isUsed, path, node) => {
    const {left} = node;
    const {type} = left;
    
    switch(type) {
    case 'Identifier':
        return isUsed(path, left.name);
    
    case 'ObjectPattern':
        return isUsedObjectPattern(isUsed, path, left);
    }
};

const isUsedObjectPattern = (isUsed, path, node) => {
    for (const {value} of node.properties) {
        if (isIdentifier(value)) {
            if (isUsed(path, value.name))
                return true;
            
            continue;
        }
    }
    
    return false;
};
