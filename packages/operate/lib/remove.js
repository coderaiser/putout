'use strict';

const {entries} = Object;
const isOneDeclaration = ({node}) => node.declarations.length === 1;

module.exports.remove = (path) => {
    if (!path.node)
        return;
    
    const {scope} = path;
    const prev = getPrevSibling(path);
    const next = getNextSibling(path);
    
    if (scope && !next.node) {
        const programBlock = scope.getProgramParent().block;
        
        if (scope.block === programBlock && !prev.node)
            programBlock.comments = getComments(path);
    }
    
    if (!path.parentPath.isArrayPattern()) {
        path.remove();
        return;
    }
    
    const elements = path.parentPath.get('elements');
    const n = elements.length - 1;
    
    for (const [i, el] of entries(elements)) {
        if (el !== path)
            continue;
        
        if (!Number(i) && n) {
            path.parentPath.node.elements[i] = null;
            break;
        }
        
        path.remove();
        break;
    }
};

const getComments = (path) => {
    const {leadingComments} = path.node;
    
    if (leadingComments?.length)
        return leadingComments;
    
    const {parentPath} = path;
    
    if (path.isVariableDeclarator() && isOneDeclaration(parentPath))
        return parentPath.node.leadingComments;
    
    return [];
};

const getPrevSibling = (path) => {
    if (!path.isVariableDeclarator())
        return path.getPrevSibling();
    
    return path.parentPath.getPrevSibling();
};

const getNextSibling = (path) => {
    if (!path.isVariableDeclarator())
        return path.getNextSibling();
    
    return path.parentPath.getNextSibling();
};
