'use strict';

const log = require('./log');
const link = require('./link');
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
    isEqualAnyObject,
    isEqualAnyArray,
    isEqualBody,
    isEqualNop,
    isLinkedNode,
    isLinkedRegExp,
} = require('./is');
const {
    isClassBody,
    isBlock,
} = require('@babel/types');

const isEmptyBlock = (a) => isBlock(a) && !a.body.length;
const isPrimitive = (a) => typeof a !== 'object' || a === null;
const {isArray} = Array;
const compareTypes = (a, b) => b;

const second = (f) => (a, b) => f(b);

const comparators = [
    compareAny,
    comparePrimitives,
    second(isClassBody),
    second(isEmptyBlock),
    second(isAny),
    isId,
    isEqualAnyArray,
    isEqualAnyObject,
    isEqualBody,
    isEqualNop,
    isLinkedRegExp,
    linkNodes,
    isAnyLiteral,
    second(isImports),
    second(isArgs),
    addObject,
    compareArrays,
];

module.exports.runComparators = (node, template, {add, templateStore}) => {
    log(template, node);
    
    for (const compare of comparators) {
        if (compare(node, template, {
            add,
            templateStore,
        })) {
            return true;
        }
    }
    
    return false;
};

function compareAny(node, template) {
    return template === '__';
}

function comparePrimitives(node, template) {
    return isPrimitive(template) && !is(template) && template === node;
}

function compareArrays(node, template, {add}) {
    const is = isArrays(node, template);
    
    if (is)
        add(node, template);
    
    return is;
}

function linkNodes(node, template, {add, templateStore}) {
    if (node && isLinkedNode(template) || isLinkedArgs(template) || isLinkedId(node, template))
        return link({
            add,
            value: template,
            nodeValue: node,
            templateStore,
        });
    
    return false;
}

function addObject(node, template, {add}) {
    const is = isObject(template);
    
    if (is)
        add(node, template);
    
    return is;
}

