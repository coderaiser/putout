'use strict';

module.exports.report = () => 'useState should be used instead of Component';

module.exports.fix = ({node}) => {
    node.imported.name = 'useState';
    node.local.name = 'useState';
};

module.exports.traverse = ({push}) => ({
    ImportDeclaration(path) {
        const {source} = path.node;
        
        if (source.value !== 'react')
            return;
        
        const name = 'Component';
        const specifiersPaths = path.get('specifiers');
        
        for (const specPath of specifiersPaths) {
            if (!specPath.isImportSpecifier())
                continue;
            
            if (!specPath.get('imported').isIdentifier({name}))
                continue;
            
            push(specPath);
        }
    },
});
