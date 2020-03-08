'use strict';

const {types, operator} = require('putout');

const {
    replaceWith,
    findBinding,
} = operator;

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
    const {
        node,
        scope,
    } = path.get('argument');
    
    if (!scope.block.async)
        return false;
    
    const {name} = node.callee;
    const bindings = findBinding(path, name);
    
    if (!bindings)
        return false;
    
    const {async} = bindings.path.node;
    return async;
};

