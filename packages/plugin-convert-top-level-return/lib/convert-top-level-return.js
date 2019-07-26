'use strict';

const {
    types,
    operate,
} = require('putout');

const {replaceWithMultiple} = operate;

const {
    CallExpression,
    MemberExpression,
    Identifier,
    ExpressionStatement,
} = types;

module.exports.report = () => `"process.exit" should be used instead of top-level return`;

const expr = (a) => a && ExpressionStatement(a);

module.exports.fix = (path) => {
    const {argument} = path.node;
    const params = [];
    const call = CallExpression(
        MemberExpression(
            Identifier('process'),
            Identifier('exit')
        ), params);
   
    if (!argument)
        path.replaceWith(call);
    
    replaceWithMultiple(path, [
        expr(argument),
        expr(call),
    ]);
};

const isRoot = (path) => path.isFunction();

module.exports.traverse = ({push}) => {
    return {
        ReturnStatement(path) {
            const fnPath = path.findParent(isRoot);
            
            if (!fnPath)
                return push(path);
        },
    };
};

