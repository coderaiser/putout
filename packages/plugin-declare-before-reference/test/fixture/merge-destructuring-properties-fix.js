'use strict';

const {types} = require('@putout/babel');
const {
    isForOf,
    isCoupleLines,
    exists,
} = require('../../is');

const {
    isObjectExpression,
    isIdentifier,
    isObjectPattern,
    isAssignmentPattern,
} = types;

function isPrevAssignObject(path) {
    const prev = path.getPrevSibling();
    
    if (!isAssignmentPattern(prev.node.value))
        return false;
    
    const {right} = path.node.value;
    
    return isObjectExpression(right);
}

isPrevAssignObject(path);
