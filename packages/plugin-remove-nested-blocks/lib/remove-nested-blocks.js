'use strict';

const {replaceWithMultiple} = require('putout').operator;
const {keys} = Object;

const intersect = (a, b) => a.filter(Set.prototype.has, new Set(b));
const isIntersect = (bindingsA, bindingsB) => {
    const keysA = keys(bindingsA);
    const keysB = keys(bindingsB);
    const is = intersect(keysA, keysB).length;
    
    return is;
};

module.exports.report = () => 'Avoid nested blocks';

module.exports.fix = (path) => {
    replaceWithMultiple(path, path.node.body);
};

module.exports.include = () => [
    'BlockStatement',
];

module.exports.filter = (path) => {
    const {parentPath} = path;
    const {bindings} = path.scope;
    
    const isSwitch = parentPath.isSwitchCase();
    const varsCount = keys(bindings).length;
    
    if (isSwitch && !varsCount)
        return true;
    
    if (isSwitch)
        return false;
    
    const is = !isIntersect(bindings, path.parentPath.scope.bindings);
    
    return is && parentPath.isBlockStatement() || parentPath.isProgram();
};

