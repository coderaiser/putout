'use strict';

const {isIdentifier} = require('putout').types;

module.exports.report = () => `"run" should be called instead of "series"`;

module.exports.find = (ast, {push, traverse}) => {
    traverse(ast, {
        CallExpression(chunk) {
            if (!isIdentifier(chunk.callee, {name: 'series'}))
                return;
            
            push(chunk);
        },
    });
};

module.exports.fix = ({callee}) => {
    callee.name = 'run';
};

