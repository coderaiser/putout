'use strict';

const {template} = require('@putout/engine-parser');
const {
    isIdentifier,
    isLiteral,
    isExpressionStatement,
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
    if (!isArray(a) || !isArray(b))
        return false;
    
    if (a.length !== b.length)
        return false;
    
    return true;
};

const isStr = (a) => typeof a === 'string';
const compareType = (type) => (path) => path.type === type;
const isSameType = (a, b) => a.type === b.type;
const extractExpression = (a) => isExpressionStatement(a) ? a.expression : a;

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
    
    const templateStore = {};
    
    const {type} = baseNode;
    const isPath = Boolean(path.node);
    
    if (isEqualAnyObject(node, baseNode))
        return true;
    
    if (isEqualAnyArray(node, baseNode))
        return true;
    
    if (isPath && node.type !== type) {
        const newPathNode = findParent(path, type);
        return superCompare(newPathNode, baseNode, templateStore);
    }
    
    return superCompare(node, baseNode, templateStore);
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
// @babel/template creates empty array directives
// extra duplicate value
const ignore = [
    'loc',
    'start',
    'end',
    'directives',
    'extra',
    'raw',
    'comments',
    'leadingComments',
];

function superCompare(node, base, templateStore) {
    if (!base || !node)
        return false;
    
    for (const key of Object.keys(base)) {
        if (ignore.includes(key))
            continue;
        
        const nodeValue = node[key];
        const value = extractExpression(base[key]);
        
        log(value, nodeValue);
        
        if (value == '__')
            continue;
        
        if (value === nodeValue)
            continue;
        
        if (isClassBody(value) || isBlock(value))
            continue;
        
        if (isIdentifier(value, {name: '__'}))
            continue;
        
        if (isEqualAnyArray(nodeValue, value))
            continue;
        
        if (isEqualAnyObject(nodeValue, value))
            continue;
        
        if (isIdentifier(value) && /^__[a-z]$/.test(value.name)) {
            const {name} = value;
            
            if (!templateStore[name]) {
                templateStore[name] = nodeValue;
                continue;
            }
            
            if (superCompare(templateStore[name], nodeValue))
                continue;
        }
        
        if (isLiteral(value, {value: '__'}) && isSameType(value, nodeValue))
            continue;
        
        if (isObject(value) && superCompare(nodeValue, value, templateStore))
            continue;
        
        if (isArrays(value, nodeValue) && superCompare(nodeValue, value, templateStore))
            continue;
        
        if (isArray(value) && isIdentifier(value[0], {name: '__args'}))
            continue;
        
        return false;
    }
    
    return true;
}

const __OBJECT_TYPE = 'ObjectPattern|ObjectExpression';
const __ARRAY_TYPE = 'ArrayPattern|ArrayExpression';

function isEqualAnyArray(node, id) {
    if (!isAnyArray(id))
        return false;
    
    const {type} = node;
    return __ARRAY_TYPE.includes(type);
}

function isEqualAnyObject(node, id) {
    if (!isAnyObject(id))
        return false;
    
    const {type} = node;
    return __OBJECT_TYPE.includes(type);
}

function parseTemplate(tmpl) {
    const node = template.ast(tmpl);
    
    if (tmpl === '__object')
        return [node, __OBJECT_TYPE];
    
    if (tmpl === '__array')
        return [node, __ARRAY_TYPE];
    
    const {type} = node;
    
    return [node, type];
}

