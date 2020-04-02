'use strict';

const {types} = require('putout');

const {
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

