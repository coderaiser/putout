'use strict';

const {
    types,
    operator,
} = require('putout');

const {replaceWithMultiple} = operator;
const {isReturnStatement} = types;

module.exports.report = () => 'Avoid IIFE';

module.exports.filter = (path) => {
    const {callee} = path.node;
    const {body} = callee.body;
    
    if (!body)
        return true;
    
    if (path.parentPath.isSequenceExpression())
        return false;
    
    if (path.parentPath.isVariableDeclarator())
        return false;
    
    const n = body.length;
    const latest = body[n - 1];
    
    return !isReturnStatement(latest);
};

module.exports.replace = () => ({
    '((__args__a) => __f(__args__a))(__args__b)': '__f(__args__b)',
    '(() => __body)()': '__body',
    '(function() {})()': (vars, path) => {
        const {body} = path.node.callee.body;
        
        replaceWithMultiple(path.parentPath, body);
        
        return '';
    },
});
