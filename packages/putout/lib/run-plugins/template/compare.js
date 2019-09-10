'use strict';

const {
    isIdentifier,
    isLiteral,
} = require('@babel/types');

const isObject = (a) => typeof a === 'object';
const compareType = (type) => (path) => path.type === type;
const findParent = (path, type) => {
    const newPathNode = path.findParent(compareType(type));
    
    if (!newPathNode)
        return null;
    
    return newPathNode.node;
};

module.exports = (path, baseNode, pathNode) => {
    const {type} = baseNode;
    
    if (pathNode.type !== type) {
        const newPathNode = findParent(path, type);
        return compare(baseNode, newPathNode);
    }
    
    return compare(baseNode, pathNode);
};

function compare(baseNode, pathNode) {
    if (!baseNode || !pathNode)
        return;
    
    for (const key of Object.keys(baseNode)) {
        if (key === 'loc')
            continue;
        
        const value = baseNode[key];
        const pathValue = pathNode[key];
        
        if (value === pathValue)
            continue;
        
        if (isIdentifier(value, {name: '__'}))
            continue;
        
        if (isLiteral(value, {value: '__'}))
            continue;
        
        if (value && isObject(value) && compare(value, pathValue))
            continue;
        
        return false;
    }
    
    return true;
}
