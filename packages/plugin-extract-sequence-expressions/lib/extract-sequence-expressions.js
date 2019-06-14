'use strict';

const {replaceWithMultiple} = require('putout').operate;

module.exports.report = () => 'sequence expressions should not be used';

module.exports.fix = (path) => {
    const {expressions} = path.node;
    
    replaceWithMultiple(path, expressions);
};

module.exports.find = (ast, {push, traverse}) => {
    traverse(ast, {
        SequenceExpression(path) {
            push(path);
        },
    });
};

