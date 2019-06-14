'use strict';

module.exports.fix = ({name, path, rightPath}) => {
    const {parentPath} = path;
    const {node} = rightPath;
    
    const specifiers = [];
    const declarator = VariableDeclaration('const', [
        VariableDeclarator(Identifier(name), node),
    ]);
    
    parentPath.replaceWith(ExportNamedDeclaration(declarator, specifiers));
    path.replaceWith(ExportNamedDeclaration(declarator, specifiers));
};

