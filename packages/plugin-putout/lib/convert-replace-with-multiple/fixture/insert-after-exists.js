'use strict';

const {
    operate,
} = require('putout');

const {
    insertAfter,
} = operate;

module.exports.fix = ({name, path, rightPath}) => {
    const {parentPath} = path;
    const {node} = rightPath;
    
    const specifiers = [];
    const declarator = VariableDeclaration('const', [
        VariableDeclarator(Identifier(name), node),
    ]);
    
    insertAfter(parentPath, ExportNamedDeclaration(declarator, specifiers));
    path.replaceWithMultiple(ExportNamedDeclaration(declarator, specifiers));
};

