'use strict';

const {
    operate,
    types,
} = require('putout');

const {
    ExportDefaultDeclaration,
    ExportNamedDeclaration,
    VariableDeclaration,
    VariableDeclarator,
    Identifier,
} = types;

const {replaceWith} = operate;

module.exports.report = () => 'ESM should be used insted of Commonjs';

module.exports.fix = ({name, path, rightPath}) => {
    const {parentPath} = path;
    const {node} = rightPath;
    
    if (!name)
        return replaceWith(parentPath, ExportDefaultDeclaration(node));
    
    const specifiers = [];
    const declarator = VariableDeclaration('const', [
        VariableDeclarator(Identifier(name), node),
    ]);
    
    replaceWith(parentPath, ExportNamedDeclaration(declarator, specifiers));
};

module.exports.traverse = ({push}) => {
    return {
        'module.exports = __'(path) {
            const {parentPath} = path;
            
            if (parentPath.isSequenceExpression())
                return;
            
            const rightPath = path.get('right');
            
            push({
                path,
                rightPath,
            });
        },
        'module.exports.__ = __'(path) {
            const {parentPath} = path;
            
            if (parentPath.isSequenceExpression())
                return;
            
            const rightPath = path.get('right');
            const propertyPath = path.get('left.property');
            const {name} = propertyPath.node;
            
            return push({
                name,
                path,
                rightPath,
            });
        },
    };
};

