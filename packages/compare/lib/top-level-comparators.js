'use strict';

const {types} = require('@putout/babel');
const {
    isEqualBody,
    isEqualAnyObject,
    isEqualAnyArray,
    isLinkedNode,
    isLinkedId,
    isLinkedRegExp,
    isEqualNop,
} = require('./is');

const {
    isIdentifier,
    isStringLiteral,
} = types;

module.exports.runTopLevelComparators = (node, templateNode) => {
    if (isEqualAnyObject(node, templateNode))
        return true;
    
    if (isEqualAnyArray(node, templateNode))
        return true;
    
    if (isEqualNop(node, templateNode))
        return true;
    
    if (isIdentifier(node) && isLinkedNode(templateNode))
        return true;
    
    if (isLinkedId(node, templateNode))
        return true;
    
    if (isLinkedRegExp(node, templateNode))
        return true;
    
    if (isStringLiteral(node) && isLinkedNode(templateNode))
        return true;
    
    return isEqualBody(node, templateNode);
};
