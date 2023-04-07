'use strict';

const {replaceWith} = require('putout').operator;

module.exports.fix = ({name, path, rightPath}) => {
    const {parentPath} = path;
    const {node} = rightPath;
    const specifiers = [];
    
    const declarator = VariableDeclaration('const', [
        VariableDeclarator(Identifier(name), node),
    ]);
    
    replaceWith(parentPath, ExportNamedDeclaration(declarator, specifiers));
    replaceWith(path, ExportNamedDeclaration(declarator, specifiers));
};
