'use strict';

const {replaceWithMultiple} = require('putout').operator;
const {keys} = Object;

const isIntersect = (bindingsA, path) => {
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

