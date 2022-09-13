'use strict';

const {
    types,
    operator,
} = require('putout');

const {replaceWithMultiple} = operator;
const {
    isReturnStatement,
    isArrowFunctionExpression,
} = types;

module.exports.report = () => 'IIFE should be removed';

module.exports.filter = (path) => {
    const {callee} = path.node;
    
    if (isArrowFunctionExpression(callee))
        return true;
    
    const {body} = callee.body;
    const n = body.length;
    const latest = body[n - 1];
    
    return !isReturnStatement(latest);
};

module.exports.replace = () => ({
    '((__args__a) => __c(__args__a))(__args__b)': '__c(__args__b)',
    '(function() {})()': (vars, path) => {
        const {body} = path.node.callee.body;
        replaceWithMultiple(path.parentPath, body);
        
        return path;
    },
});

