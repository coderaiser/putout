'use strict';

const {types} = require('putout');
const {isIdentifier} = types;

module.exports = ({use, declare}) => ({
    TSExpressionWithTypeArguments(path) {
        const {expression} = path.node;
        
        if (isIdentifier(expression))
            use(path, expression.name);
    },
    TSTypeReference(path) {
        const {node} = path;
        const {typeName} = node;
        
        if (isIdentifier(typeName))
            use(path, typeName.name);
    },
    
    TSQualifiedName(path) {
        const {node} = path;
        const {left} = node;
        
        if (isIdentifier(left))
            use(path, left.name);
    },
    
    TSInterfaceDeclaration(path) {
        declare(path, path.node.id.name);
    },
    
    TSMethodSignature(path) {
        const parametersPath = path.get('parameters');
        
        for (const paramPath of parametersPath) {
            if (paramPath.isIdentifier()) {
                declare(paramPath, paramPath.node.name);
                use(paramPath, paramPath.node.name);
                continue;
            }
            
            if (paramPath.isRestElement()) {
                use(paramPath, paramPath.node.argument.name);
                continue;
            }
        }
    },
});

