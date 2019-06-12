'use strict';

const {
    types,
    operate,
} = require('putout');

const {
    importDeclaration,
    importSpecifier,
    importDefaultSpecifier,
    isStringLiteral,

} = types;

const {
    replaceWith,
} = operate;

module.exports.report = () => 'ESM should be used insted of Commonjs';

module.exports.fix = ({path, source, local, properties, isDefault}) => {
    const {parentPath} = path;
    
    if (isDefault) {
        const declaration = importDeclaration([importDefaultSpecifier(local)], source);
        return replaceWith(parentPath, declaration);
    }
    
    const specifiers = [];
    for (const {key, value} of properties)
        specifiers.push(importSpecifier(key, value));
    
    replaceWith(parentPath, importDeclaration(specifiers, source));
};

module.exports.find = (ast, {push, traverse}) => {
    traverse(ast, {
        VariableDeclarator(path) {
            const idPath = path.get('id');
            const initPath = path.get('init');
            
            if (!initPath.isCallExpression())
                return;
            
            const calleePath = initPath.get('callee');
            
            if (!calleePath.isIdentifier({name: 'require'}))
                return;
            
            const [source] = initPath.node.arguments;
            
            if (!isStringLiteral(source))
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

