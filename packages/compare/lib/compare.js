'use strict';

const {template} = require('@putout/engine-parser');

const {
    findVarsWays,
    getValues,
    setValues,
    getTemplateValues,
} = require('./vars');

const {runComparators} = require('./run-comparators');
const {runTopLevelComparators} = require('./top-level-comparators');

const {
    isStr,
    isPath,
    isEqualType,
    isTemplate,
    parseTemplate,
} = require('./is');

const {extractExpression} = template;
const addWaterMark = (a) => a;

const {keys} = Object;
const {isArray} = Array;
const noop = () => {};
const isEmptyArray = (a) => isArray(a) && !a.length;

const compareType = (type) => (path) => path.type === type;
const superPush = (array) => (a, b, c = {}) => array.push([a, b, c]);
const maybeArray = (a) => isArray(a) ? a : [a];

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

function compare(path, template, options = {}, equal = noop) {
    const {findUp = true} = options;
    
    if (!path && !template)
        return true;
    
    if (!path)
        return false;
    
    if (!template)
        return false;
    
    const node = addWaterMark(extractExpression(parseNode(path)));
    const templateNode = extractExpression(parseNode(template));
    
    equal(node, templateNode);
    
    if (node.type === template)
        return true;
    
    if (runTopLevelComparators(node, templateNode))
        return true;
    
    if (findUp && isPath(path) && !isEqualType(node, templateNode)) {
        const {type} = templateNode;
        const newPathNode = findParent(path, type);
        
        return superCompareIterate(newPathNode, templateNode);
    }
    
    return superCompareIterate(node, templateNode);
}

module.exports.compareAny = (path, templateNodes, options) => {
    templateNodes = maybeArray(templateNodes);
    
    for (const template of templateNodes) {
        if (compare(path, template, options))
            return true;
    }
    
    return false;
};

module.exports.compareAll = (path, templateNodes, options) => {
    templateNodes = maybeArray(templateNodes);
    
    for (const template of templateNodes) {
        if (!compare(path, template, options))
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
    'parent',
    'phase',
    'range',
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
        const [node, template, {plain} = {}] = item;
        
        if (!node || isEmptyArray(node) && !isEmptyArray(template))
            return false;
        
        for (const key of keys(template)) {
            if (ignore.includes(key))
                continue;
            
            const nodeValue = extractExpression(node[key]);
            const value = extractExpression(template[key]);
            
            const is = runComparators(nodeValue, value, {
                add,
                templateStore,
                plain,
            });
            
            if (!is)
                return false;
        }
    }
    
    return true;
}
