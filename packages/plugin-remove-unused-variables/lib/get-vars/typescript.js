'use strict';

const {types} = require('putout');

const {isTSModuleDeclaration} = types;

module.exports = ({use, declare}) => ({
    TSExpressionWithTypeArguments(path) {
        const {expression} = path.node;
        const {type} = expression;
        
        switch(type) {
        case 'Identifier': use(path, expression.name);
        }
    },
    
    TSTypeReference(path) {
        const {node} = path;
        const {typeName} = node;
        const {type} = typeName;
        
        switch(type) {
        case 'Identifier': use(path, typeName.name);
        }
    },
    
    TSAsExpression(path) {
        const {node} = path;
        const {expression} = node;
        const {type} = expression;
        
        switch(type) {
        case 'Identifier': use(path, expression.name);
        }
    },
    
    TSQualifiedName(path) {
        const {node} = path;
        const {left} = node;
        const {type} = left;
        
        switch(type) {
        case 'Identifier': use(path, left.name);
        }
    },
    
    TSInterfaceDeclaration(path) {
        declare(path, path.node.id.name);
        
        if (path.findParent(isTSModuleDeclaration))
            use(path, path.node.id.name);
    },
    
    TSMethodSignature(path) {
        const parametersPath = path.get('parameters');
        
        for (const paramPath of parametersPath) {
            if (paramPath.isIdentifier()) {
                declare(paramPath, paramPath.node.name);
                use(paramPath, paramPath.node.name);
                continue;
            }
            
            const {type} = paramPath;
            
            switch(type) {
            case 'RestElement':
                use(paramPath, paramPath.node.argument.name);
                continue;
            }
        }
    },
});

