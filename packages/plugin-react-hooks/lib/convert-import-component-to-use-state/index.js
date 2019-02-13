'use strict';

const {isImportSpecifier} = require('putout').types;

module.exports.report = () => 'useState should be used instead of Component';

module.exports.fix = (path) => {
    const {node} = path;
    
    node.imported.name = 'useState';
    node.local.name = 'useState';
};

module.exports.find = (ast, {traverse}) => {
    const places = [];
    
    traverse(ast, {
        ImportDeclaration(path) {
            const {source} = path.node;
        
            if (source.value !== 'react')
                return;
        
            const specifiersPaths = path.get('specifiers');
            for (const specPath of specifiersPaths) {
                const {node} = specPath;
          
                if (!isImportSpecifier(node))
                    continue;
          
                places.push(specPath);
            }
        },
    });
    
    return places;
};

