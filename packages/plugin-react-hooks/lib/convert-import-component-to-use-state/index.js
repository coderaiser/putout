'use strict';

module.exports.report = () => 'useState should be used instead of Component';

module.exports.fix = (chunk) => {
    const {node} = chunk;
    
    node.imported.name = 'useState';
    node.local.name = 'useState';
};

module.exports.find = (ast, {push, traverse}) => {
    traverse(ast, {
        ImportDeclaration(chunk) {
            const {source} = chunk.node;
            
            if (source.value !== 'react')
                return;
            
            const name = 'Component';
            const specifiersPaths = chunk.specifiers;
            for (const specPath of specifiersPaths) {
                if (!specPath.isImportSpecifier())
                    continue;
                
                if (!specPath.imported.isIdentifier({name}))
                    continue;
                
                push(specPath);
            }
        },
    });
};
