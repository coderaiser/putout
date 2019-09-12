'use strict';

const {
    types,
    operate,
} = require('putout');

const {
    replaceWith,
    replaceWithMultiple,
} = operate;

const {
    CallExpression,
    MemberExpression,
    Identifier,
    ExpressionStatement,
} = types;

const isRoot = (path) => path.isFunction();

module.exports.report = () => `"process.exit" should be used instead of top-level return`;

const expr = (a) => a && ExpressionStatement(a);

module.exports.fix = (path) => {
    const {argument} = path.node;
    const params = [];
    const call = CallExpression(MemberExpression(
        Identifier('process'),
        Identifier('exit')
    ), params);
    
    if (!argument)
        replaceWith(path, call);
    
    replaceWithMultiple(path, [
        expr(argument),
        expr(call),
    ]);
};

module.exports.include = () => [
    'return __',
];

module.exports.filter = (path) => {
    const fnPath = path.findParent(isRoot);
    
    if (!fnPath)
        return true;
    
    return false;
};

