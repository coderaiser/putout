'use strict';

const {isIdentifier} = require('putout').types;

module.exports.report = ({idName}) => `Useless variable declaration with name "${idName}"`;

module.exports.fix = ({path, bindingPath, initName, idName}) => {
    bindingPath.scope.rename(initName, idName);
    path.remove();
};

module.exports.find = (ast, {push, traverse}) => {
    traverse(ast, {
        VariableDeclarator(path) {
            const {id, init} = path.node;
            
            if (!isIdentifier(init))
                return;
            
            if (!isIdentifier(id))
                return;
            
            const {name} = init;
            
            if (id.name.length < name.length)
                return;
            
            const binding = path.scope.bindings[name];
            
            if (!binding)
                return;
            
            const bindingPath = path.scope.bindings[name].path;
            
            push({
                path,
                bindingPath,
                initName: init.name,
                idName: id.name,
            });
        },
    });
};
