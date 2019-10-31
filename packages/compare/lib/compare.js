'use strict';

const {template} = require('@putout/engine-parser');
const {
    isIdentifier,
    isLiteral,
    isExpressionStatement,
} = require('@babel/types');

const log = require('./log');

const isObject = (a) => typeof a === 'object';
const isStr = (a) => typeof a === 'string';
const compareType = (type) => (path) => path.type === type;

const findParent = (path, type) => {
    const newPathNode = path.findParent(compareType(type));
    
    if (!newPathNode)
        return null;
    
    return newPathNode.node;
};

function parseNode(a) {
    if (isStr(a))
        return template.ast(a);
    
    if (!a.node)
        return a;
    
    return a.node;
}

module.exports.compare = compare;

function compare(path, base) {
    const node = parseNode(path);
    const baseNode = parseNode(base);
    
    const {type} = baseNode;
    const isPath = Boolean(path.node);
    
    if (isPath && node.type !== type) {
        const newPathNode = findParent(path, type);
        return superCompare(newPathNode, baseNode);
    }
    
    return superCompare(node, baseNode);
}

module.exports.compareAny = (path, baseNodes) => {
    for (const base of baseNodes) {
        if (compare(path, base))
            return true;
    }
    
    return false;
};

module.exports.compareAll = (path, baseNodes) => {
    for (const base of baseNodes) {
        if (!compare(path, base))
            return false;
    }
    
    return true;
};

function superCompare(pathNode, baseNode) {
    if (!baseNode || !pathNode)
        return;
    
    const base = baseNode;
    const node = pathNode;
    
    for (const key of Object.keys(baseNode)) {
        // @babel/template creates empty array directives
        // extra duplicate value
        if (/loc|start|end|directives|extra|raw/.test(key))
            continue;
        
        const value = base[key];
        const pathValue = node[key];
        
        log (value, pathValue);
        
        if (value == '__')
            continue;
        
        if (value === pathValue)
            continue;
        
        const id = isExpressionStatement(value) ? value.expression : value;
        
        if (isIdentifier(id, {name: '__'}))
            continue;
        
        if (isIdentifier(id) && /^_[a-z]$/.test(id.name))
            continue;
        
        if (isLiteral(value, {value: '__'}) && value.type === pathValue.type)
            continue;
        
        if (value && isObject(value) && superCompare(pathValue, value))
            continue;
        
        return false;
    }
    
    return true;
}

