'use strict';

const {
    isIdentifier,
    isLiteral,
    isExpressionStatement,
} = require('@babel/types');

const isObject = (a) => typeof a === 'object';
const compareType = (type) => (path) => path.type === type;
const findParent = (path, type) => {
    const newPathNode = path.findParent(compareType(type));
    
    if (!newPathNode)
        return null;
    
    return newPathNode.node;
};

module.exports.compare = compare;

function compare(path, baseNode, pathNode) {
    const {type} = baseNode;
    
    if (pathNode.type !== type) {
        const newPathNode = findParent(path, type);
        return superCompare(baseNode, newPathNode);
    }
    
    return superCompare(baseNode, pathNode);
}

module.exports.compareAny = (path, baseNodes, pathNode) => {
    for (const base of baseNodes) {
        if (compare(path, base, pathNode))
            return true;
    }
    
    return false;
};

function superCompare(baseNode, pathNode) {
    if (!baseNode || !pathNode)
        return;
    
    const base = baseNode;
    const node = pathNode;
    
    for (const key of Object.keys(baseNode)) {
        // @babel/template creates empty array directives
        if (/loc|directives/.test(key))
            continue;
        
        const value = base[key];
        const pathValue = node[key];
        
        if (value === pathValue)
            continue;
        
        const id = isExpressionStatement(value) ? value.expression : value;
        
        if (isIdentifier(id, {name: '__'}))
            continue;
        
        if (isLiteral(value, {value: '__'}))
            continue;
        
        if (value && isObject(value) && superCompare(value, pathValue))
            continue;
        
        return false;
    }
    
    return true;
}
