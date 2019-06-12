'use strict';

const {binaryExpression} = require('putout').types;

module.exports.report = () => 'sequence expressions should not be used';

module.exports.fix = (path) => {
    const {expressions} = path.node;
    
    path.replaceWithMultiple(expressions);
};

module.exports.find = (ast, {push, traverse}) => {
    traverse(ast, {
        SequenceExpression(path) {
            push(path);
        },
    });
};

