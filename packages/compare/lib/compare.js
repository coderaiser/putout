'use strict';

const {template} = require('@putout/engine-parser');
const {
    isExpressionStatement,
    isClassBody,
    isBlock,
} = require('@babel/types');

const log = require('./log');
const {
    isObject,
    isArrays,
    isAny,
    isAnyLiteral,
    isAnyArgs,
    isStr,
    isPath,
    isEqualType,
    isEqualAnyObject,
    isEqualAnyArray,
    isLinkedNode,
    parseTemplate,
} = require('./is');

const compareType = (type) => (path) => path.type === type;
const extractExpression = (a) => isExpressionStatement(a) ? a.expression : a;
const superPush = (array) => (a, b) => array.push([a, b]);

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

function compare(path, base) {
    const node = parseNode(path);
    const baseNode = parseNode(base);
    
    if (isEqualAnyObject(node, baseNode))
        return true;
    
    if (isEqualAnyArray(node, baseNode))
        return true;
    
    if (isPath(path) && !isEqualType(node, baseNode)) {
        const {type} = baseNode;
        const newPathNode = findParent(path, type);
        
        return superCompareIterate(newPathNode, baseNode);
    }
    
    return superCompareIterate(node, baseNode);
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

function superCompareIterate(node, base) {
    let item = [node, base];
    
    const array = [item];
    const templateStore = {};
    const add = superPush(array);
    
    while (item = array.pop()) {
        const [node, base] = item;
        const is = superCompare(node, base, {
            add,
            templateStore,
        });
        
        if (!is)
            return false;
    }
    
    return true;
}

function superCompare(node, base, {add, templateStore}) {
    if (!node)
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
        
        if (isAny(value))
            continue;
        
        if (isEqualAnyArray(nodeValue, value))
            continue;
        
        if (isEqualAnyObject(nodeValue, value))
            continue;
        
        if (isLinkedNode(value)) {
            const {name} = value;
            
            if (!templateStore[name]) {
                templateStore[name] = nodeValue;
                continue;
            }
            
            add(templateStore[name], nodeValue);
            continue;
        }
        
        if (isAnyLiteral(nodeValue, value))
            continue;
        
        if (isObject(value)) {
            add(nodeValue, value);
            continue;
        }
        
        if (isAnyArgs(value))
            continue;
        
        if (isArrays(value, nodeValue)) {
            add(nodeValue, value);
            continue;
        }
        
        return false;
    }
    
    return true;
}

