'use strict';

const {template} = require('@putout/engine-parser');
const {
    isIdentifier,
    isLiteral,
    isExpressionStatement,
    isArrayPattern,
    isArrayExpression,
    isObjectPattern,
    isObjectExpression,
    isClassBody,
    isBlock,
} = require('@babel/types');

const log = require('./log');

const {isArray} = Array;

const isObject = (a) => {
    if (!a)
        return false;
    
    if (isArray(a))
        return false;
    
    return typeof a === 'object';
};

const isArrays = (a, b) => {
    if (!isArray(a) && !isArray(b))
        return false;
    
    if (a.length !== b.length)
        return false;
    
    return true;
};

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
module.exports.parseTemplate = parseTemplate;

const isAnyObject = (a) => isIdentifier(a, {name: '__object'});
const isAnyArray = (a) => isIdentifier(a, {name: '__array'});

function compare(path, base) {
    const node = parseNode(path);
    const baseNode = parseNode(base);
    
    const {type} = baseNode;
    const isPath = Boolean(path.node);
    
    if (isEqualAnyObject(node, baseNode))
        return true;
    
    if (isEqualAnyArray(node, baseNode))
        return true;
    
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
        
        log(value, pathValue);
        
        if (value == '__')
            continue;
        
        if (value === pathValue)
            continue;
        
        if (isClassBody(value) || isBlock(value))
            continue;
        
        const id = isExpressionStatement(value) ? value.expression : value;
        
        if (isIdentifier(id, {name: '__'}))
            continue;
        
        if (isEqualAnyArray(pathValue, id))
            continue;
        
        if (isEqualAnyObject(pathValue, id))
            continue;
        
        if (isIdentifier(id) && /^__[a-z]$/.test(id.name))
            continue;
        
        if (isLiteral(value, {value: '__'}) && value.type === pathValue.type)
            continue;
        
        if (isObject(value) && superCompare(pathValue, value))
            continue;
        
        if (isArrays(value, pathValue) && superCompare(pathValue, value))
            continue;
        
        if (isArray(id) && isIdentifier(id[0], {name: '__args'}))
            continue;
        
        return false;
    }
    
    return true;
}

function isEqualAnyArray(node, id) {
    if (!isAnyArray(id))
        return false;
    
    if (!isArrayPattern(node) && !isArrayExpression(node))
        return false;
    
    return true;
}

function isEqualAnyObject(node, id) {
    if (!isAnyObject(id))
        return false;
    
    if (!isObjectPattern(node) && !isObjectExpression(node))
        return false;
    
    return true;
}

function parseTemplate(tmpl) {
    const node = template.ast(tmpl);

    if (tmpl === '__object')
        return [node, 'ObjectPattern|ObjectExpression'];

    if (tmpl === '__array')
        return [node, 'ArrayPattern|ArrayExpression'];

    const {type} = node;

    return [node, type];
}

