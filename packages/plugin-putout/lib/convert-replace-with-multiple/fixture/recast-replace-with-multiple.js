'use strict';

module.exports.fix = ({name, path, rightPath}) => {
    const {parentPath} = path;
    const {node} = rightPath;
    
    const specifiers = [];
    const declarator = VariableDeclaration('const', [
        VariableDeclarator(Identifier(name), node),
    ]);
    
    parentPath.replaceWithMultiple(ExportNamedDeclaration(declarator, specifiers));
    path.replaceWithMultiple(ExportNamedDeclaration(declarator, specifiers));
};

