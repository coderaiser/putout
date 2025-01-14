'use strict';

const {types, operator} = require('putout');
const {isReturnStatement} = types;
const {replaceWithMultiple} = operator;
const {keys} = Object;

const isIntersect = (bindingsA, path) => {
    if (path.removed)
        return false;
    
    path.scope.crawl();
    
    const keysA = keys(bindingsA);
    
    for (const key of keysA) {
        if (path.scope.hasBinding(key))
            return true;
    }
    
    return false;
};

module.exports.report = () => 'Avoid nested blocks';

module.exports.fix = (path) => {
    replaceWithMultiple(path, path.node.body);
};

module.exports.include = () => [
    'BlockStatement',
];

module.exports.filter = (path) => {
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
    
    const is = !isIntersect(bindings, path.parentPath);
    
    return is && (parentPath.isBlockStatement() || parentPath.isProgram());
};

function isReturnWithoutArg(path) {
    const prevPath = path.getPrevSibling();
    
    if (!isReturnStatement(prevPath))
        return false;
    
    return !prevPath.node.argument;
}
