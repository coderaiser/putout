import {types} from '@putout/babel';
import {maybeBody} from './maybe-body.js';
import {toExpression} from './to-expression.js';

const {
    isSequenceExpression,
    isArrayExpression,
} = types;

const getNode = (a) => a.node || a;

export const replaceWithMultiple = (path, nodes) => {
    const {node} = path;
    const {
        trailingComments,
        comments,
        leadingComments,
    } = node;
    
    delete path.node.trailingComments;
    
    const parentComments = path.parentPath.node.comments;
    const newNodes = nodes
        .filter(Boolean)
        .map(getNode)
        .map(toExpression);
    
    removeDuplicateLeadingComments(newNodes);
    
    const {leadingComments: ownLeadingComments} = newNodes.at(0) || {};
    const {trailingComments: ownTrailingComments} = newNodes.at(-1) || {};
    
    const {currentPath} = maybeBody(path);
    const newPath = currentPath.replaceWithMultiple(newNodes);
    
    if (!newPath.length)
        return newPath;
    
    if (!leadingComments && !isSequenceExpression(path))
        restoreLeadingComments(newPath[0].node, ownLeadingComments);
    else if (leadingComments && ownLeadingComments)
        newPath[0].node.leadingComments = mergeComments(leadingComments, ownLeadingComments);
    
    const first = newPath.at(0);
    const last = newPath.at(-1);
    
    first.node.comments = comments || parentComments;
    last.node.trailingComments = mergeComments(ownTrailingComments, trailingComments);
    const newParentPath = first.parentPath;
    
    if (isSequenceExpression(newParentPath) && isArrayExpression(newParentPath.parentPath)) {
        const {
            parentPath,
            key,
            node,
        } = newParentPath;
        
        parentPath.node.elements.splice(key, 1, ...node.expressions);
    }
    
    return newPath;
};

function removeDuplicateLeadingComments(nodes) {
    for (const node1 of nodes) {
        for (const node2 of nodes) {
            if (node1 === node2)
                continue;
            
            if (node1.leadingComments === node2.leadingComments)
                delete node2.leadingComments;
        }
    }
}

function restoreLeadingComments(node, ownLeadingComments) {
    if (ownLeadingComments) {
        node.leadingComments = ownLeadingComments;
        return;
    }
    
    delete node.leadingComments;
}

function mergeComments(own, comments) {
    if (!own)
        return comments;
    
    if (!comments)
        return own;
    
    const rest = comments.filter((comment) => !own.includes(comment));
    
    return [...own, ...rest];
}
