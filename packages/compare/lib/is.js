'use strict';

const {template} = require('@putout/engine-parser');
const {isIdentifier} = require('@babel/types');

const ANY_OBJECT = '__object';
const ANY_ARRAY = '__array';
const LINKED_NODE = /^__[a-z]$/;

const isAnyObject = (a) => isIdentifier(a, {
    name: ANY_OBJECT,
});

const isAnyArray = (a) => isIdentifier(a, {
    name: ANY_ARRAY,
});

const {isArray} = Array;

module.exports.isEqualType = (a, b) => a.type === b.type;
module.exports.isStr = (a) => typeof a === 'string';
module.exports.isAny = (a) => isIdentifier(a, {name: '__'});
module.exports.isPath = (path) => Boolean(path.node);
module.exports.isArray = isArray;

module.exports.isObject = (a) => {
    if (!a)
        return false;
    
    if (isArray(a))
        return false;
    
    return typeof a === 'object';
};

module.exports.isArrays = (a, b) => {
    if (!isArray(a) || !isArray(b))
        return false;
    
    if (a.length !== b.length)
        return false;
    
    return true;
};

const __OBJECT_TYPE = 'ObjectPattern|ObjectExpression';
const __ARRAY_TYPE = 'ArrayPattern|ArrayExpression';

module.exports.isEqualAnyArray = (node, baseNode) => {
    if (!isAnyArray(baseNode))
        return false;
    
    const {type} = node;
    return __ARRAY_TYPE.includes(type);
};

module.exports.isEqualAnyObject = (node, baseNode) => {
    if (!isAnyObject(baseNode))
        return false;
    
    const {type} = node;
    return __OBJECT_TYPE.includes(type);
};

module.exports.isLinkedNode = (a) => isIdentifier(a) && LINKED_NODE.test(a.name);

module.exports.parseTemplate = (tmpl) => {
    const node = template.ast(tmpl);
    
    if (tmpl === ANY_OBJECT)
        return [node, __OBJECT_TYPE];
    
    if (tmpl === ANY_ARRAY)
        return [node, __ARRAY_TYPE];
    
    const {type} = node;
    
    return [node, type];
};
