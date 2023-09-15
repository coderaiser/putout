'use strict';

const {operator, types} = require('putout');

const {remove, rename} = operator;
const {isIdentifier} = types;

module.exports.report = ({idName}) => `Useless variable declaration with name "${idName}"`;

module.exports.fix = ({path, bindingPath, initName, idName}) => {
    rename(bindingPath, initName, idName);
    remove(path);
};

module.exports.traverse = ({push}) => ({
    VariableDeclarator(path) {
        const {node, parentPath} = path;
        
        const {id, init} = node;
        
        if (parentPath.parentPath.isExportNamedDeclaration())
            return;
        
        if (!isIdentifier(init))
            return;
        
        if (!isIdentifier(id))
            return;
        
        const {name} = init;
        
        if (id.name.length < name.length)
            return;
        
        if (id.name === name.toUpperCase())
            return;
        
        const binding = path.scope.bindings[name];
        
        if (!binding)
            return;
        
        if (binding.referencePaths.length > 1)
            return;
        
        const bindingPath = binding.path;
        
        if (bindingPath.isVariableDeclarator() && bindingPath.get('id').isObjectPattern())
            return;
        
        if (bindingPath.isObjectPattern())
            return;
        
        push({
            path,
            bindingPath,
            initName: init.name,
            idName: id.name,
        });
    },
});
