'use strict';

const {types} = require('putout');

const {
    isIdentifier,
    isTSModuleDeclaration,
} = types;

module.exports = ({use, declare}) => ({
    TSExpressionWithTypeArguments(path) {
        const {expression} = path.node;
        const {type} = expression;
        
        switch(type) {
        case 'Identifier': use(path, expression.name);
        }
    },
    
    TSFunctionType(path) {
        const {node} = path;
        const {parameters} = node;
        
        for (const param of parameters) {
            const {type} = param;
            
            switch(type) {
            case 'Identifier':
                declare(path, param.name);
                use(path, param.name);
                break;
            
            case 'RestElement':
                if (isIdentifier(param.argument))
                    use(path, param.argument.name);
            }
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
    
    TSTypeAliasDeclaration(path) {
        const {node} = path;
        const {id} = node;
        const {type} = id;
        
        switch(type) {
        case 'Identifier': declare(path, id.name);
        }
    },
    
    TSTypeQuery(path) {
        const {node} = path;
        const {exprName} = node;
        const {type} = exprName;
        
        switch(type) {
        case 'Identifier': use(path, exprName.name);
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
    TSDeclareFunction(path) {
        const params = path.get('params');
        
        if (!params.length)
            return;
        
        const [firstPath] = path.get('params');
        
        if (firstPath.isRestElement())
            use(firstPath, firstPath.node.argument.name);
    },
});

