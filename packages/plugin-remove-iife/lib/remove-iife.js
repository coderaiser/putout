'use strict';

const {replaceWithMultiple} = require('putout').operator;

module.exports.report = () => 'IIFE should be removed';

module.exports.replace = () => ({
    '(function() {})()': ({}, path) => {
        const {body} = path.node.callee.body;
        replaceWithMultiple(path.parentPath, body);
        
        return path;
    },
});

