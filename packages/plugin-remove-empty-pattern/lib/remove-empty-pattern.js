'use strict';

module.exports.report = (path) => {
    if (path.isObjectPattern())
        return 'Empty object pattern';
    
    return 'Empty array pattern';
};

module.exports.fix = (path) => {
    const {parentPath} = path;
    
    if (parentPath.isVariableDeclarator())
        return parentPath.remove();
    
    path.remove();
};

module.exports.traverse = ({push}) => {
    return {
        ObjectPattern(path) {
            const {node} = path;
            const {properties} = node;
            
            if (properties.length)
                return;
            
            push(path);
        },
        ArrayPattern(path) {
            const {node} = path;
            const {elements} = node;
            
            if (elements.length)
                return;
            
            push(path);
        },
    };
};

