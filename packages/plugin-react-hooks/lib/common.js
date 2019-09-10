'use strict';

const {types} = require('putout');

const {
    isIdentifier,
    isMemberExpression,
} = types;

module.exports.isExtendComponent = isExtendComponent;

function isExtendComponent(superClass) {
    const name = 'Component';
    
    if (isIdentifier(superClass, {name}))
        return true;
    
    if (isMemberExpression(superClass) && isIdentifier(superClass.property, {name}))
        return true;
    
    return false;
}

module.exports.traverseClass = (traverse, ast, visitor) => {
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

