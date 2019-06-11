'use strict';

const {
    importDeclaration,
    importSpecifier,
    importDefaultSpecifier,

} = require('putout').types;

module.exports.report = () => 'ESM should be used insted of Commonjs';

module.exports.fix = ({path, source, local, properties, isDefault}) => {
    const {parentPath} = path;
    
    if (isDefault)
        return parentPath.replaceWith(
            importDeclaration([importDefaultSpecifier(local)], source)
        );
    
    const specifiers = [];
    for (const {key, value} of properties)
        specifiers.push(importSpecifier(key, value));
    
    parentPath.replaceWith(
        importDeclaration(specifiers, source)
    );
};

module.exports.find = (ast, {push, traverse}) => {
    traverse(ast, {
        VariableDeclarator(path) {
            const idPath = path.get('id');
            const initPath = path.get('init');
            
            if (!initPath.isCallExpression())
                return;
            
            const calleePath = initPath.get('callee');
            const [source] = initPath.node.arguments;
            
            if (!calleePath.isIdentifier({name: 'require'}))
                return;
            
            if (idPath.isIdentifier())
                return push({
                    path,
                    source,
                    local: idPath.node,
                    isDefault: true,
                });
            
            const {properties} = idPath.node;
            
            if (idPath.isObjectPattern()) {
                return push({
                    path,
                    source,
                    properties,
                    isDefault: false,
                });
            }
        },
    });
};

