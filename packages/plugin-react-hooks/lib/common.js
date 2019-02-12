'use strict';

const {
    isIdentifier,
    isMemberExpression,
} = require('putout').types;

module.exports.isExtendComponent = isExtendComponent;

function isExtendComponent(superClass) {
    const name = 'Component';
    
    if (isIdentifier(superClass, {name}))
        return true;
    
    if (isMemberExpression(superClass) && isIdentifier(superClass.property, {name}))
        return true;
    
    return false;
}

module.exports.findClass = (traverse, ast, visitor) => {
    traverse(ast, {
        ClassDeclaration(path) {
            const {node} = path;
            const {superClass} = node;
            
            if (!isExtendComponent(superClass))
                return;
            
            path.traverse(visitor);
        },
    });
};

