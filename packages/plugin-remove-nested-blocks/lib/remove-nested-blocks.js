'use strict';

const {types, operator} = require('putout');
const {
    isReturnStatement,
    isExportNamedDeclaration,
} = types;

const {replaceWithMultiple} = operator;
const {keys} = Object;

module.exports.report = () => 'Avoid nested blocks';

module.exports.fix = (path) => {
    replaceWithMultiple(path, path.node.body);
};

module.exports.include = () => [
    'BlockStatement',
];

module.exports.filter = (path) => {
    const prev = path.getPrevSibling();
    
    if (isExportNamedDeclaration(prev))
        return false;
    
    if (isReturnWithoutArg(path))
        return false;
    
    const {parentPath} = path;
    const {bindings} = path.scope;
    
    const isSwitch = parentPath.isSwitchCase();
    const varsCount = keys(bindings).length;
    
    if (isSwitch && !varsCount)
        return true;
    
    if (isSwitch)
        return false;
    
    if (!parentPath.isBlockStatement() && !parentPath.isProgram())
        return false;
    
    if (!isIntersect(parentPath, bindings))
        return true;
    
    return path.container.length === 1;
};

function isReturnWithoutArg(path) {
    const prevPath = path.getPrevSibling();
    
    if (!isReturnStatement(prevPath))
        return false;
    
    return !prevPath.node.argument;
}

const isIntersect = (path, bindings) => {
    for (const key of keys(bindings)) {
        if (path.scope.hasBinding(key))
            return true;
    }
    
    return false;
};
