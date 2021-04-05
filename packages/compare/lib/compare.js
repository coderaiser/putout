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

const link = require('./link');
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
    isLinkedRegExp,
    isTemplate,
    parseTemplate,
} = require('./is');

const {keys} = Object;

const isEmptyBlock = (a) => isBlock(a) && !a.body.length;
const isPrimitive = (a) => typeof a !== 'object' || a === null;
const comparePrimitives = (nodeValue, value) => isPrimitive(value) && !is(value) && value === nodeValue;

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

function compare(path, template) {
    if (!path)
        return false;
    
    const node = parseNode(path);
    const templateNode = parseNode(template);
    
    if (isEqualAnyObject(node, templateNode))
        return true;
    
    if (isEqualAnyArray(node, templateNode))
        return true;
    
    if (isEqualNop(node, templateNode))
        return true;
    
    if (isPath(path) && !isEqualType(node, templateNode)) {
        const {type} = templateNode;
        const newPathNode = findParent(path, type);
        
        return superCompareIterate(newPathNode, templateNode);
    }
    
    return superCompareIterate(node, templateNode);
}

module.exports.compareAny = (path, templateNodes) => {
    for (const template of templateNodes) {
        if (compare(path, template))
            return true;
    }
    
    return false;
};

module.exports.compareAll = (path, templateNodes) => {
    for (const template of templateNodes) {
        if (!compare(path, template))
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
    'innerComments',
    'trailingComments',
    'importKind',
    'exportKind',
];

function superCompareIterate(node, template) {
    let item = [node, template];
    
    const array = [item];
    const templateStore = {};
    const add = superPush(array);
    
    while (item = array.pop()) {
        const [node, template] = item;
        
        if (!node)
            return false;
        
        for (const key of keys(template)) {
            if (ignore.includes(key))
                continue;
            
            const nodeValue = extractExpression(node[key]);
            const value = extractExpression(template[key]);
            
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
    
    if (comparePrimitives(nodeValue, value))
        return true;
    
    if (isClassBody(value))
        return true;
    
    if (isEmptyBlock(value))
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
    
    if (isLinkedRegExp(nodeValue, value))
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

