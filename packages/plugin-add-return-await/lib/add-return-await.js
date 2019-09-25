'use strict';

const {types, operate} = require('putout');
const {replaceWith} = operate;
const {AwaitExpression} = types;

module.exports.report = () => `"return await promise()" should be used instead of "return promise()"`;

module.exports.fix = (path) => {
    const argumentPath = path.get('argument');
    const {node} = argumentPath;
    
    replaceWith(argumentPath, AwaitExpression(node));
};

module.exports.include = () => [
    'return __()',
];

module.exports.exclude = () => [
    'return await __()',
];

module.exports.filter = (path) => {
    const argumentPath = path.get('argument');
    
    const {
        node,
        scope,
    } = argumentPath;
    
    if (!scope.block.async)
        return false;
    
    const {name} = node.callee;
    const referencedPath = path.findParent((path) => path.scope.bindings[name]);
    
    if (!referencedPath)
        return;
    
    const bindings = referencedPath.scope.bindings[name];
    
    if (bindings.path.node.async)
        return true;
    
    return false;
};

