'use strict';

const {replaceWithMultiple} = require('putout').operator;
const {keys} = Object;

module.exports.report = () => 'Nested blocks should not be used';

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
    
    return parentPath.isBlockStatement();
};

