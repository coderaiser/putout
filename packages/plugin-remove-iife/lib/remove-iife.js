'use strict';

const {
    types,
    operator,
} = require('putout');

const {replaceWithMultiple} = operator;
const {isReturnStatement} = types;

module.exports.report = () => 'IIFE should be removed';

module.exports.filter = (path) => {
    const {body} = path.node.callee.body;
    const n = body.length;
    const latest = body[n - 1];
    
    return !isReturnStatement(latest);
};

module.exports.replace = () => ({
    '(function() {})()': ({}, path) => {
        const {body} = path.node.callee.body;
        replaceWithMultiple(path.parentPath, body);
        
        return path;
    },
});

