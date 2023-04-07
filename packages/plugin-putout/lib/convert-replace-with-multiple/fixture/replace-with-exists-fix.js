'use strict';

const {operate} = require('putout');

const {
    replaceWith,
    replaceWithMultiple,
} = operate;

module.exports.fix = ({name, path, rightPath}) => {
    const {parentPath} = path;
    const {node} = rightPath;
    const specifiers = [];
    
    const declarator = VariableDeclaration('const', [
        VariableDeclarator(Identifier(name), node),
    ]);
    
    replaceWith(parentPath, ExportNamedDeclaration(declarator, specifiers));
    replaceWithMultiple(path, ExportNamedDeclaration(declarator, specifiers));
};
