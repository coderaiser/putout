'use strict';

const {template} = require('@putout/engine-parser');
const {
    isExpressionStatement,
    isClassBody,
    isBlock,
} = require('@babel/types');

const guard = require('./guard');
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
        
        if (!node)
            return false;
        
        for (const key of Object.keys(base)) {
            if (ignore.includes(key))
                continue;
            
            const a = node[key];
            const b = extractExpression(base[key]);
            
            const is = superCompare(a, b, {
                add,
                templateStore,
            });
            
            if (!is)
                return false;
        }
    }
    
    return true;
}

const logNodes = (a, b) => log(a, b);
const isAnyString = (a, b) => b === '__';
const isEqual = (a, b) => a === b;
const isBody = (a) => isClassBody(a) || isBlock(a);
const addLinkedNode = (a, b, {add, templateStore}) => {
    if (!isLinkedNode(a))
        return false;
    
    const {name} = b;
    
    if (!templateStore[name]) {
        templateStore[name] = a;
        return true;
    }
    
    add(templateStore[name], a);
    return true;
};

const addObject = (a, b, {add}) => isObject(a) && add(a, b);
const addArray = (a, b, {add}) => isArrays(b, a) && add(a, b);

const superCompare = guard([
    logNodes,
    isAnyString,
    isEqual,
    isBody,
    isAny,
    isEqualAnyArray,
    isEqualAnyObject,
    addLinkedNode,
    isAnyLiteral,
    isAnyArgs,
    addObject,
    addArray,
]);

