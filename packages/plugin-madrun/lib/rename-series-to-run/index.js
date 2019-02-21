'use strict';

const {isIdentifier} = require('putout').types;

module.exports.report = () => `"run" should be called instead of "series"`;

module.exports.find = (ast, {push, traverse}) => {
    traverse(ast, {
        CallExpression(path) {
            if (!isIdentifier(path.node.callee, {name: 'series'}))
                return;
            
            push(path);
        },
    });
};

module.exports.fix = (path) => {
    path.node.callee.name = 'run';
};

