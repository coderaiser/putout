'use strict';

const {
    replaceWith,
    insertAfter,
} = require('putout').operate;

module.exports.fix = ({name, path, rightPath}) => {
    const {parentPath} = path;
    const {node} = rightPath;
    const specifiers = [];
    
    const declarator = VariableDeclaration('const', [
        VariableDeclarator(Identifier(name), node),
    ]);
    
    insertAfter(parentPath, [
        ExportNamedDeclaration(declarator, specifiers),
    ]);
    replaceWith(path, ExportNamedDeclaration(declarator, specifiers));
};
