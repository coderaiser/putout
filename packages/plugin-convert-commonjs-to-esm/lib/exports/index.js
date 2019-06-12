'use strict';

const {
    ExportDefaultDeclaration,
    ExportNamedDeclaration,
    VariableDeclaration,
    VariableDeclarator,
    Identifier,
} = require('putout').types;

const {replaceWith} = require('putout').operate;

module.exports.report = () => 'ESM should be used insted of Commonjs';

module.exports.fix = ({name, path, rightPath}) => {
    const {parentPath} = path;
    const {node} = rightPath;
    
    if (!name)
        return parentPath.replaceWith(ExportDefaultDeclaration(node));
    
    const specifiers = [];
    const declarator = VariableDeclaration('const', [
        VariableDeclarator(Identifier(name), node),
    ]);
    
    replaceWith(parentPath, ExportNamedDeclaration(declarator, specifiers));
};

const isObject = (path) => path.isIdentifier({
    name:'module',
});

const isExports = (path) => path.isIdentifier({
    name: 'exports',
});

module.exports.find = (ast, {push, traverse}) => {
    traverse(ast, {
        AssignmentExpression(path) {
            const {parentPath} = path;
            
            if (parentPath.isSequenceExpression())
                return;
            
            const leftPath = path.get('left');
            const rightPath = path.get('right');
            
            if (!leftPath.isMemberExpression()) {
                return;
            }
            
            const objectPath = leftPath.get('object');
            const propertyPath = leftPath.get('property');
            
            if (isObject(objectPath) && isExports(propertyPath))
                return push({
                    path,
                    rightPath,
                });
            
            if (!objectPath.isMemberExpression())
                return;
            
            const nestedObjectPath = objectPath.get('object');
            const nestedPropertyPath = objectPath.get('property');
            const {name} = propertyPath.node;
            
            if (isObject(nestedObjectPath) && isExports(nestedPropertyPath))
                return push({
                    name,
                    path,
                    rightPath,
                });
        },
    });
};

