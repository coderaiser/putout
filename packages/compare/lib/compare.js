'use strict';

const {template} = require('@putout/engine-parser');
const {
    isExpressionStatement,
    isClassBody,
    isBlock,
} = require('@babel/types');

const {
    findVarsWays,
    getValues,
    setValues,
    getTemplateValues,
} = require('./vars');

const link = require('.//link');
const log = require('./log');

const {
    is,
    isId,
    isObject,
    isArrays,
    isAny,
    isAnyLiteral,
    isArgs,
    isLinkedArgs,
    isLinkedId,
    isImports,
    isStr,
    isPath,
    isEqualType,
    isEqualAnyObject,
    isEqualAnyArray,
    isEqualBody,
    isEqualNop,
    isLinkedNode,
    isTemplate,
    parseTemplate,
} = require('./is');

const {isArray} = Array;
const {keys} = Object;

const isEmptyBlock = (a) => isBlock(a) && !a.body.length;
const isPrimitive = (a) => typeof a !== 'object' || a === null;

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
module.exports.isTemplate = isTemplate;

module.exports.findVarsWays = findVarsWays;
module.exports.getValues = getValues;
module.exports.setValues = setValues;
module.exports.getTemplateValues = getTemplateValues;

function compare(path, base) {
    const node = parseNode(path);
    const baseNode = parseNode(base);
    
    if (isEqualAnyObject(node, baseNode))
        return true;
    
    if (isEqualAnyArray(node, baseNode))
        return true;
    
    if (isEqualNop(node, baseNode))
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
        
        if (isArray(node) && isArray(base) && node.length !== base.length)
            return false;
        
        for (const key of keys(base)) {
            if (ignore.includes(key))
                continue;
            
            const nodeValue = extractExpression(node[key]);
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
    
    if (value === '__')
        return true;
    
    if (isPrimitive(value) && !is(value) && value === nodeValue)
        return true;
    
    if (isClassBody(value) || isEmptyBlock(value))
        return true;
    
    if (isAny(value))
        return true;
    
    if (isId(nodeValue, value))
        return true;
    
    if (isEqualAnyArray(nodeValue, value))
        return true;
    
    if (isEqualAnyObject(nodeValue, value))
        return true;
    
    if (isEqualBody(nodeValue, value))
        return true;
    
    if (isEqualNop(nodeValue, value))
        return true;
    
    if (isLinkedNode(value) || isLinkedArgs(value) || isLinkedId(nodeValue, value))
        return link({
            add,
            value,
            nodeValue,
            templateStore,
        });
    
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
    
    if (isArrays(nodeValue, value)) {
        add(nodeValue, value);
        return true;
    }
    
    return false;
}

