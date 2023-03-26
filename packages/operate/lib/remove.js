'use strict';

const {entries} = Object;
const isOneDeclaration = ({node}) => node.declarations.length === 1;

module.exports.remove = (path) => {
    const programBlock = path.scope.getProgramParent().block;
    const prev = getPrevSibling(path);
    
    if (path.scope.block === programBlock && !prev.node)
        programBlock.comments = getComments(path);
    
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
        
        if (el === path) {
            path.remove();
            break;
        }
    }
};
const getComments = (path) => {
    const {comments} = path.node;
    
    if (comments?.length)
        return comments;
    
    const {parentPath} = path;
    
    if (path.isVariableDeclarator() && isOneDeclaration(parentPath)) {
        return parentPath.node.comments;
    }
    
    return [];
};

const getPrevSibling = (path) => {
    if (!path.isVariableDeclarator())
        return path.getPrevSibling();
    
    return path.parentPath.getPrevSibling();
};

