'use strict';

const log = require('./log');
const link = require('./link');

const {
    is,
    isId,
    isBool,
    isObject,
    isArrays,
    isAny,
    isAnyLiteral,
    isArgs,
    isJSXChildren,
    isJSXAttributes,
    isLinkedArgs,
    isLinkedId,
    isLinkedBool,
    isImports,
    isExports,
    isEqualAnyObject,
    isEqualAnyArray,
    isEqualBody,
    isEqualFunctionDeclarationBody,
    isEqualNop,
    isLinkedNode,
    isLinkedRegExp,
} = require('./is');

const {types} = require('@putout/babel');
const {
    isClassBody,
    isBlock,
    isJSXText,
    isTemplateElement,
} = types;

const isEmptyBlock = (a) => isBlock(a) && !a.body.length;
const isPrimitive = (a) => typeof a !== 'object' || a === null;

const second = (f) => (a, b) => f(b);

const comparators = [
    compareTemplateElements,
    compareJSXTexts,
    compareAny,
    comparePrimitives,
    second(isClassBody),
    second(isEmptyBlock),
    second(isAny),
    isId,
    isBool,
    isEqualAnyArray,
    isEqualAnyObject,
    isEqualBody,
    isEqualFunctionDeclarationBody,
    isEqualNop,
    isLinkedRegExp,
    linkNodes,
    isAnyLiteral,
    second(isImports),
    second(isExports),
    second(isArgs),
    second(isJSXChildren),
    second(isJSXAttributes),
    addObject,
    compareArrays,
];

module.exports.runComparators = (node, template, {add, templateStore}) => {
    let i = -1;
    const n = comparators.length;
    
    log(template, node);
    
    while (++i < n) {
        const compare = comparators[i];
        
        if (compare(node, template, {add, templateStore}))
            return true;
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

function compareTemplateElements(node, template) {
    if (!isTemplateElement(node) || !isTemplateElement(template))
        return false;
    
    const isValue = node.value.raw === template.value.raw;
    const isCooked = node.value.cooked === template.value.cooked;
    const isTail = node.tail === template.tail;
    
    return isValue && isCooked && isTail;
}

function linkNodes(node, template, {add, templateStore}) {
    if (node && isLinkedNode(template) || isLinkedArgs(template) || isLinkedId(node, template) || isLinkedBool(node, template))
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

function compareJSXTexts(node, template) {
    if (!isJSXText(node) || !isJSXText(template))
        return false;
    
    return /^\s+$/.test(template.value) && /^\s+$/.test(node.value);
}
