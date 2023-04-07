'use strict';

const {
    replaceWith,
    replaceWithMultiple,
} = require('putout').operate;

module.exports.fix = ({name, path, rightPath}) => {
    const {parentPath} = path;
    const {node} = rightPath;
    const specifiers = [];
    
    const declarator = VariableDeclaration('const', [
        VariableDeclarator(Identifier(name), node),
    ]);
    
    replaceWithMultiple(parentPath, [
        ExportNamedDeclaration(declarator, specifiers),
    ]);
    replaceWith(path, ExportNamedDeclaration(declarator, specifiers));
};
