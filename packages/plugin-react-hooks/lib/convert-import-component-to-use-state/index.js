export const report = () => 'useState should be used instead of Component';

export const fix = ({node}) => {
    node.imported.name = 'useState';
    node.local.name = 'useState';
};

export const traverse = ({push}) => ({
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
