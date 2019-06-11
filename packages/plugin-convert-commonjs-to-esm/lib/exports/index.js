'use strict';

const {ExportDefaultDeclaration} = require('putout').types;

module.exports.report = () => 'ESM should be used insted of Commonjs';

module.exports.fix = ({path, rightPath}) => {
    const {parentPath} = path;
    const {node} = rightPath;
    
    parentPath.replaceWith(ExportDefaultDeclaration(node));
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
            const leftPath = path.get('left');
            const rightPath = path.get('right');
            
            if (!leftPath.isMemberExpression()) {
                return;
            }
            
            const objectPath = leftPath.get('object');
            const propertyPath = leftPath.get('property');
            
            if (!isObject(objectPath) || !isExports(propertyPath))
                return;
            
            push({
                path,
                rightPath,
            });
        },
    });
};

