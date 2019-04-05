'use strict';

const {
    types,
    traverse,
} = require('putout');

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

module.exports.traverseClass = (ast, visitor) => {
    traverse(ast, {
        ClassDeclaration(chunk) {
            const {node} = chunk;
            const {superClass} = node;
            
            if (!isExtendComponent(superClass))
                return;
            
            chunk.traverse(visitor);
        },
    });
};

