import {types} from '@putout/babel';
import {
    isEqualBody,
    isEqualAnyObject,
    isEqualAnyArray,
    isLinkedNode,
    isLinkedId,
    isLinkedRegExp,
    isEqualNop,
} from './is.js';

const {
    isIdentifier,
    isStringLiteral,
} = types;

const comparators = [
    isEqualAnyObject,
    isEqualAnyArray,
    isEqualNop,
    isLinkedAndIdentifier,
    isLinkedAndStringLiteral,
    isLinkedId,
    isLinkedRegExp,
    isEqualBody,
];

export const runTopLevelComparators = (node, templateNode) => {
    let i = -1;
    const n = comparators.length;
    
    while (++i < n) {
        const compare = comparators[i];
        
        if (compare(node, templateNode))
            return true;
    }
    
    return false;
};

function isLinkedAndIdentifier(node, templateNode) {
    return isIdentifier(node) && isLinkedNode(templateNode);
}

function isLinkedAndStringLiteral(node, templateNode) {
    return isStringLiteral(node) && isLinkedNode(templateNode);
}
