'use strict';

const {operate} = require('putout');

const {
    insertAfter,
    replaceWithMultiple,
} = operate;

module.exports.fix = ({name, path, rightPath}) => {
    const {parentPath} = path;
    const {node} = rightPath;
    const specifiers = [];
    
    const declarator = VariableDeclaration('const', [
        VariableDeclarator(Identifier(name), node),
    ]);
    
    insertAfter(parentPath, ExportNamedDeclaration(declarator, specifiers));
    replaceWithMultiple(path, ExportNamedDeclaration(declarator, specifiers));
};
