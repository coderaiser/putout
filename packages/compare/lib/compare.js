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
    isArgs,
    isImports,
    isStr,
    isPath,
    isEqualType,
    isEqualAnyObject,
    isEqualAnyArray,
    isLinkedNode,
    parseTemplate,
    isNameStr,
    isArgsStr,
    isImportsStr,
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

module.exports.isName = isNameStr;
module.exports.isImports = isImportsStr;
module.exports.isArgs = isArgsStr;

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
        
        if (!node)
            return false;
        
        for (const key of Object.keys(base)) {
            if (ignore.includes(key))
                continue;
            
            const nodeValue = node[key];
            const value = extractExpression(base[key]);
            
            const is = superCompare(nodeValue, value, {
                add,
                templateStore,
            });
            
            if (!is)
                return false;
        }
    }
    
    return true;
}

function superCompare(nodeValue, value, {add, templateStore}) {
    log(value, nodeValue);
    
    if (value == '__')
        return true;
    
    if (value === nodeValue)
        return true;
    
    if (isClassBody(value) || isBlock(value))
        return true;
    
    if (isAny(value))
        return true;
    
    if (isEqualAnyArray(nodeValue, value))
        return true;
    
    if (isEqualAnyObject(nodeValue, value))
        return true;
    
    if (isLinkedNode(value)) {
        const {name} = value;
        
        if (!templateStore[name]) {
            templateStore[name] = nodeValue;
            return true;
        }
        
        add(templateStore[name], nodeValue);
        return true;
    }
    
    if (isAnyLiteral(nodeValue, value))
        return true;
    
    if (isImports(value))
        return true;
    
    if (isArgs(value))
        return true;
    
    if (isObject(value)) {
        add(nodeValue, value);
        return true;
    }
    
    if (isArrays(value, nodeValue)) {
        add(nodeValue, value);
        return true;
    }
    
    return false;
}

