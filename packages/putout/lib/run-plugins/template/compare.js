'use strict';

const {
    isIdentifier,
    isLiteral,
} = require('@babel/types');

const isObject = (a) => typeof a === 'object';
const isUndefined = (a) => typeof a === 'undefined';
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
    
    for (const key of Object.keys(baseNode)) {
        if (key === 'loc')
            continue;
        
        const value = baseNode[key];
        const pathValue = pathNode[key];
        
        if (isUndefined(pathValue))
            continue;
        
        if (value === pathValue)
            continue;
        
        if (isIdentifier(value, {name: '__'}))
            continue;
        
        if (isLiteral(value, {value: '__'}))
            continue;
        
        if (value && isObject(value) && superCompare(value, pathValue))
            continue;
        
        return false;
    }
    
    return true;
}
