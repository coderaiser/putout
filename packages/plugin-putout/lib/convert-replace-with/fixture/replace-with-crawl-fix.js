import {types} from 'putout';

const {ExportNamedDeclaration} = types;
const {Identifier} = types;
const {replaceWith} = require('putout').operator;
const {VariableDeclarator} = types;
const {VariableDeclaration} = types;

'use strict';

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
